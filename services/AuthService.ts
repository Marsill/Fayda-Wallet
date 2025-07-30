import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';

export interface AuthResult {
  success: boolean;
  error?: string;
}

export class AuthService {
  static async checkBiometricSupport(): Promise<boolean> {
    if (Platform.OS === 'web') {
      // Web fallback - simulate biometric support
      return true;
    }

    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    return compatible && enrolled;
  }

  static async authenticateWithBiometrics(): Promise<AuthResult> {
    try {
      if (Platform.OS === 'web') {
        // Web fallback - simulate biometric authentication
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true });
          }, 1500);
        });
      }

      const hasSupport = await this.checkBiometricSupport();
      if (!hasSupport) {
        return {
          success: false,
          error: 'Biometric authentication is not available on this device'
        };
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your digital wallet',
        cancelLabel: 'Cancel',
        fallbackLabel: 'Use PIN',
        disableDeviceFallback: false,
      });

      if (result.success) {
        return { success: true };
      } else {
        return {
          success: false,
          error: result.error || 'Authentication failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'An error occurred during authentication'
      };
    }
  }

  static async authenticateWithPIN(pin: string): Promise<AuthResult> {
    // Simulate PIN verification
    return new Promise((resolve) => {
      setTimeout(() => {
        if (pin === '123456') { // Demo PIN
          resolve({ success: true });
        } else {
          resolve({
            success: false,
            error: 'Invalid PIN'
          });
        }
      }, 1000);
    });
  }

  static generateVerificationHash(data: any): string {
    // Simulate secure hash generation
    const timestamp = Date.now();
    const randomSalt = Math.random().toString(36).substring(2);
    return `sha256:${timestamp}_${randomSalt}_${JSON.stringify(data).length}`;
  }
}