import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(null);

export const defaultSettings = {
  companyName: "Skyline Salt and Minerals",
  tagline: "Premier Salt & Industrial Minerals Manufacturing, Processing and Global Supply",
  officeAddress: "Plot No. 92, Near Fateh Mamad Hajira, Lalshah Burhanshah Dargah, Bhuj-Kutch, 370001, Gujarat, India.",
  officeMapsUrl: "https://www.google.com/maps/search/?api=1&query=Plot+No.+92,+Near+Fateh+Mamad+Hajira,+Lalshah+Burhanshah+Dargah,+Bhuj-Kutch,+370001,+Gujarat,+India",
  factoryAddress: "Plot No. D-35, Jawahar Nagar, Gandhidham, Kutch, 370201, Gujarat, India.",
  factoryMapsUrl: "https://www.google.com/maps/search/?api=1&query=Plot+No.+D-35,+Jawahar+Nagar,+Gandhidham,+Kutch,+370201,+Gujarat,+India",
  phonePrimary: "+91 73839 39786",
  phoneSecondary: "+91 96871 36559",
  emailInfo: "Info@skylinesaltandminerals.com",
  emailSupport: "support@skylinesaltandminerals.com",
  workingHours: "Monday to Saturday: 9:00 AM – 7:30 PM (IST)",
  productionCapacity: "350,000+ Metric Tons / Year",
  exportMarkets: "50+ Countries across GCC, Southeast Asia, East Africa, Europe & Americas",
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/skyline-salt-and-minerals",
    indiamart: "https://www.indiamart.com/skylinesaltandminerals"
  }
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings(prev => ({ ...prev, ...data.settings }));
        }
      }
    } catch (err) {
      console.warn('Using default settings fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    return { settings: defaultSettings, loading: false, refreshSettings: () => {} };
  }
  return ctx;
}

