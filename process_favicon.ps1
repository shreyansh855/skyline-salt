Add-Type -AssemblyName System.Drawing

$srcPath = "client/public/skyline-emblem-raw.jpg"
if (-not (Test-Path $srcPath)) {
    Write-Error "File not found: $srcPath"
    exit 1
}

$src = [System.Drawing.Bitmap]::FromFile((Resolve-Path $srcPath))
$size = 768
$x = [int]((1024 - 768) / 2)
$cropRect = New-Object System.Drawing.Rectangle($x, 0, $size, $size)
$cropped = $src.Clone($cropRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Create high-res 512x512 with transparent background
$final512 = New-Object System.Drawing.Bitmap(512, 512, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($final512)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.DrawImage($cropped, 0, 0, 512, 512)

# Make pure black background transparent
for ($py = 0; $py -lt 512; $py++) {
    for ($px = 0; $px -lt 512; $px++) {
        $color = $final512.GetPixel($px, $py)
        if ($color.R -lt 24 -and $color.G -lt 24 -and $color.B -lt 24) {
            $final512.SetPixel($px, $py, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}

$final512.Save("client/public/skyline-emblem.png", [System.Drawing.Imaging.ImageFormat]::Png)
$final512.Save("client/public/apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$final512.Save("server/uploads/skyline-emblem.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 64x64 favicon
$fav64 = New-Object System.Drawing.Bitmap(64, 64, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gFav = [System.Drawing.Graphics]::FromImage($fav64)
$gFav.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gFav.DrawImage($final512, 0, 0, 64, 64)
$fav64.Save("client/public/favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 32x32 ico
$fav32 = New-Object System.Drawing.Bitmap(32, 32, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gFav32 = [System.Drawing.Graphics]::FromImage($fav32)
$gFav32.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gFav32.DrawImage($final512, 0, 0, 32, 32)
$icon = [System.Drawing.Icon]::FromHandle($fav32.GetHicon())
$fileStream = New-Object System.IO.FileStream("client/public/favicon.ico", [System.IO.FileMode]::Create)
$icon.Save($fileStream)
$fileStream.Close()

$g.Dispose()
$gFav.Dispose()
$gFav32.Dispose()
$final512.Dispose()
$fav64.Dispose()
$fav32.Dispose()
$cropped.Dispose()
$src.Dispose()

Write-Output "Favicon and transparent skyline-emblem.png generated successfully!"

