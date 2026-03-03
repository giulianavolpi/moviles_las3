import 'package:flutter/material.dart';

/// UniMarket brand colors matching the web app (deep-green, sage, mustard, accent).
class AppTheme {
  static const Color deepGreen = Color(0xFF2D4A3E);
  static const Color sage = Color(0xFF9CAF88);
  static const Color sageDark = Color(0xFF5C6B4F);
  static const Color mustard = Color(0xFFD4A84B);
  static const Color accent = Color(0xFFB5B682);
  static const Color warmBeige = Color(0xFFE8E0D5);
  static const Color cardBg = Color(0xFFFFFFFF);
  static const Color background = Color(0xFFF8F7F4);
  static const Color muted = Color(0xFFF1F0EB);
  static const Color mutedForeground = Color(0xFF6B7280);
  static const Color foreground = Color(0xFF1F2937);
  static const Color destructive = Color(0xFFDC2626);

  static ThemeData get theme => ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.light(
      primary: deepGreen,
      onPrimary: Colors.white,
      secondary: sage,
      onSecondary: sageDark,
      surface: cardBg,
      onSurface: foreground,
      error: destructive,
      onError: Colors.white,
    ),
    scaffoldBackgroundColor: background,
    appBarTheme: const AppBarTheme(
      backgroundColor: deepGreen,
      foregroundColor: Colors.white,
      elevation: 0,
    ),
    cardTheme: CardTheme(
      color: cardBg,
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: sage,
        foregroundColor: sageDark,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: Colors.white,
        side: const BorderSide(color: Colors.white54),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: Colors.white,
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
    ),
    textTheme: const TextTheme(
      headlineLarge: TextStyle(
        fontSize: 28,
        fontWeight: FontWeight.w800,
        color: Colors.white,
      ),
      headlineMedium: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
      titleLarge: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
      bodyMedium: TextStyle(fontSize: 14),
      bodySmall: TextStyle(fontSize: 12, color: mutedForeground),
    ),
  );
}
