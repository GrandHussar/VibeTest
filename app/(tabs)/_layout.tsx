import React, { useEffect, useState } from 'react';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { auth } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { ActivityIndicator, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
      setLoading(false); // Set loading to false once we know the auth state
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // List of protected routes that require authentication
    const protectedRoutes = ['/', '/report', '/settings'];

    // Redirect to login if the user tries to access a protected route without authentication
    if (!loading && !authenticated && protectedRoutes.includes(pathname)) {
      router.replace('/(tabs)/login');
    }
  }, [authenticated, loading, pathname, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          href: authenticated ? undefined : null, // Hide if not authenticated
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
          href: authenticated ? undefined : null, // Hide if not authenticated
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
          href: authenticated ? undefined : null, // Hide if not authenticated
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <TabBarIcon name="log-in-outline" color={color} />,
          href: !authenticated ? undefined : null, // Hide if authenticated
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Register',
          tabBarIcon: ({ color }) => <TabBarIcon name="person-add-outline" color={color} />,
          href: !authenticated ? undefined : null, // Hide if authenticated
        }}
      />
    </Tabs>
  );
}
