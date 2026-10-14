import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, {
  Rect,
  Circle,
  Path,
  G,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

interface AuthHeroGraphicProps {
  type: 'onboarding' | 'login' | 'signup';
}

export const AuthHeroGraphic: React.FC<AuthHeroGraphicProps> = ({ type }) => {
  const { width } = useWindowDimensions();

  if (type === 'onboarding') {
    const svgWidth = Math.min(width * 0.9, 340);
    const svgHeight = 240;

    return (
      <View style={styles.container}>
        <Svg width={svgWidth} height={svgHeight} viewBox="0 0 340 240" fill="none">
          <Defs>
            <LinearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
              <Stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.8" />
            </LinearGradient>
            <LinearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <Stop offset="100%" stopColor="#F0FDFA" stopOpacity="0.9" />
            </LinearGradient>
            <LinearGradient id="tealGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#2DD4BF" />
              <Stop offset="100%" stopColor="#0D9488" />
            </LinearGradient>
          </Defs>

          {/* Background glowing circles and decorative rings */}
          <Circle cx="170" cy="110" r="105" fill="#14B8A6" fillOpacity="0.25" />
          <Circle cx="80" cy="50" r="35" fill="#2DD4BF" fillOpacity="0.2" />
          <Circle cx="280" cy="70" r="45" fill="#5EEAD4" fillOpacity="0.15" />

          {/* Floating Gear 1 (Top Right) */}
          <G transform="translate(225, 20)">
            <Circle cx="20" cy="20" r="16" stroke="#99F6E4" strokeWidth="3" strokeDasharray="6 3" />
            <Circle cx="20" cy="20" r="8" fill="#CCFBF1" fillOpacity="0.6" />
          </G>

          {/* Floating Gear 2 (Left) */}
          <G transform="translate(25, 95)">
            <Circle cx="15" cy="15" r="12" stroke="#5EEAD4" strokeWidth="2.5" strokeDasharray="4 2" />
            <Circle cx="15" cy="15" r="5" fill="#E0F2FE" fillOpacity="0.8" />
          </G>

          {/* Central Diagnostic / Service Clipboard Document */}
          <G transform="translate(65, 30)">
            {/* Main Document Card */}
            <Rect x="0" y="0" width="160" height="185" rx="18" fill="url(#cardGrad)" stroke="#CCFBF1" strokeWidth="2" />
            
            {/* Header notch / clip */}
            <Rect x="55" y="-6" width="50" height="12" rx="6" fill="#0D9488" />

            {/* Dashboard / Speedometer & Battery Bar */}
            <Rect x="18" y="24" width="75" height="42" rx="10" fill="#E0F2FE" />
            <Circle cx="38" cy="45" r="14" stroke="#0D9488" strokeWidth="3" fill="none" />
            <Path d="M 38 45 L 45 40" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />
            <Rect x="60" y="38" width="24" height="4" rx="2" fill="#0D9488" />
            <Rect x="60" y="46" width="16" height="4" rx="2" fill="#99F6E4" />

            {/* Status Checklist items on the right */}
            <Rect x="105" y="25" width="38" height="10" rx="4" fill="#99F6E4" fillOpacity="0.6" />
            <Rect x="105" y="40" width="38" height="10" rx="4" fill="#99F6E4" fillOpacity="0.6" />
            <Rect x="105" y="55" width="38" height="10" rx="4" fill="#99F6E4" fillOpacity="0.6" />

            {/* Main Chart / Vehicle Health Visual */}
            <Rect x="18" y="78" width="124" height="46" rx="10" fill="#F0FDFA" stroke="#99F6E4" strokeWidth="1" />
            <Circle cx="40" cy="101" r="15" fill="#CCFBF1" />
            <Circle cx="40" cy="101" r="9" fill="#0D9488" />
            <Path d="M 68 108 L 84 94 L 100 102 L 122 88" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <Circle cx="122" cy="88" r="3" fill="#0D9488" />

            {/* Status Progress Bar */}
            <Rect x="18" y="136" width="124" height="28" rx="8" fill="#E0F2FE" />
            <Rect x="26" y="146" width="75" height="8" rx="4" fill="url(#tealGrad)" />
            <Circle cx="125" cy="150" r="6" fill="#10B981" />
          </G>

          {/* Left Technician / Mechanic Figure with Tablet */}
          <G transform="translate(35, 120)">
            {/* Head */}
            <Circle cx="22" cy="12" r="9" fill="#FCD34D" />
            {/* Torso & Uniform */}
            <Path d="M 12 28 Q 22 22 32 28 L 34 58 L 10 58 Z" fill="#0D9488" />
            {/* Legs */}
            <Rect x="13" y="58" width="7" height="34" rx="3" fill="#0F172A" />
            <Rect x="24" y="58" width="7" height="34" rx="3" fill="#0F172A" />
            {/* Tablet held in hand */}
            <Rect x="26" y="32" width="22" height="30" rx="4" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.5" />
            <Rect x="30" y="36" width="14" height="4" rx="2" fill="#0D9488" />
            <Rect x="30" y="44" width="14" height="12" rx="2" fill="#99F6E4" />
          </G>

          {/* Right Assistant Figure on ladder/stand */}
          <G transform="translate(235, 115)">
            {/* Ladder structure */}
            <Path d="M 12 95 L 20 20 M 36 95 L 28 20" stroke="#99F6E4" strokeWidth="2" strokeLinecap="round" />
            <Path d="M 14 78 L 34 78 M 16 60 L 32 60 M 18 42 L 30 42" stroke="#99F6E4" strokeWidth="2" strokeLinecap="round" />
            {/* Head */}
            <Circle cx="24" cy="8" r="8" fill="#FCD34D" />
            {/* Body */}
            <Path d="M 15 22 Q 24 18 33 22 L 32 46 L 16 46 Z" fill="#0284C7" />
            <Rect x="18" y="46" width="5" height="28" rx="2" fill="#0F172A" />
            <Rect x="25" y="46" width="5" height="28" rx="2" fill="#0F172A" />
          </G>
        </Svg>
      </View>
    );
  }

  // Login & Signup Hero Background Graphic
  return (
    <View style={styles.ambientGraphicWrap} pointerEvents="none">
      <Svg width={width} height={160} viewBox="0 0 375 160" fill="none">
        {/* Soft decorative background circles */}
        <Circle cx="330" cy="50" r="90" fill="#2DD4BF" fillOpacity="0.18" />
        <Circle cx="60" cy="20" r="60" fill="#5EEAD4" fillOpacity="0.12" />

        {/* Tilted Floating Mobile Phone Mockup in top right */}
        <G transform="translate(260, -25) rotate(15)">
          {/* Phone Body */}
          <Rect
            x="0"
            y="0"
            width="105"
            height="180"
            rx="22"
            fill="#FFFFFF"
            fillOpacity="0.18"
            stroke="#99F6E4"
            strokeWidth="2"
          />
          {/* Screen */}
          <Rect
            x="6"
            y="6"
            width="93"
            height="168"
            rx="18"
            fill="#0F766E"
            fillOpacity="0.4"
          />
          {/* Camera Notch */}
          <Rect x="35" y="10" width="35" height="9" rx="4.5" fill="#042F2E" />
          {/* Screen Content Mockup */}
          <Rect x="18" y="32" width="69" height="28" rx="7" fill="#2DD4BF" fillOpacity="0.3" />
          <Rect x="18" y="70" width="50" height="7" rx="3.5" fill="#CCFBF1" fillOpacity="0.4" />
          <Rect x="18" y="84" width="69" height="7" rx="3.5" fill="#CCFBF1" fillOpacity="0.25" />
          <Rect x="18" y="98" width="40" height="7" rx="3.5" fill="#CCFBF1" fillOpacity="0.2" />
        </G>

        {/* Floating Gear Element */}
        <G transform="translate(190, 45)">
          <Circle cx="18" cy="18" r="14" stroke="#99F6E4" strokeWidth="2.5" strokeDasharray="5 3" />
          <Circle cx="18" cy="18" r="6" fill="#CCFBF1" fillOpacity="0.35" />
        </G>

        {/* Additional Small Gear */}
        <G transform="translate(160, 95)">
          <Circle cx="12" cy="12" r="9" stroke="#5EEAD4" strokeWidth="2" strokeDasharray="4 2" />
          <Circle cx="12" cy="12" r="4" fill="#99F6E4" fillOpacity="0.3" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  ambientGraphicWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    overflow: 'hidden',
  },
});

