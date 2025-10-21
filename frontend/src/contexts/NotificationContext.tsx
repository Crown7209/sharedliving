"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface MatchNotification {
  id: string;
  userId: string;
  matchedUserId: string;
  matchedUserName?: string;
  propertyId?: string;
  createdAt: string;
}

interface NotificationContextType {
  notifications: MatchNotification[];
  addNotification: (notification: MatchNotification) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<MatchNotification[]>([]);

  const addNotification = (notification: MatchNotification) => {
    setNotifications((prev) => [notification, ...prev]);

    // Show toast notification
    toast.success(
      `🎉 New Match! You and ${
        notification.matchedUserName || "someone"
      } are interested in each other!`,
      {
        duration: 5000,
        action: {
          label: "View Matches",
          onClick: () => {
            // Navigate to matches page
            window.location.href = "/matches";
          },
        },
      }
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem("match-notifications");
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed);
      } catch (error) {
        console.error("Error parsing saved notifications:", error);
      }
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("match-notifications", JSON.stringify(notifications));
  }, [notifications]);

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
