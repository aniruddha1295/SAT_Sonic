# 🔧 Self Protocol "Proof Failed" Troubleshooting Guide

## 🚨 Error: "Unable to prove your identity to The app. Due to technical issues."

This error occurs when Self Protocol fails to generate cryptographic proof from your identity document. Here's how to fix it:

## 🔍 Root Causes & Solutions

### **1. Document Photo Quality Issues**
**Symptoms**: `proof_generation_failed` in console logs
**Solutions**:
- ✅ **Better Lighting**: Use bright, even lighting (avoid shadows)
- ✅ **Clear Focus**: Ensure document is sharp and in focus
- ✅ **Full Document**: Capture entire document within frame
- ✅ **Flat Surface**: Place document on flat, contrasting background
- ✅ **No Glare**: Avoid reflections from document surface

### **2. Document Type Compatibility**
**Supported Documents**:
- ✅ **Passport** (Most reliable)
- ✅ **Aadhaar Card** (India)
- ✅ **National ID Cards** (Select countries)
- ❌ **Driver's License** (Limited support)

**Best Practice**: Use passport for highest success rate

### **3. Network Connectivity Issues**
**Symptoms**: Timeout or connection errors
**Solutions**:
- ✅ **Stable WiFi**: Use strong, stable internet connection
- ✅ **Mobile Data**: Try switching between WiFi and mobile data
- ✅ **VPN**: Disable VPN if active
- ✅ **Firewall**: Check if firewall is blocking WebSocket connections

### **4. Self App Issues**
**Solutions**:
- ✅ **Update App**: Ensure Self app is latest version
- ✅ **Restart App**: Close and reopen Self app
- ✅ **Clear Cache**: Clear Self app cache/data
- ✅ **Reinstall**: Uninstall and reinstall Self app if needed

### **5. Device-Specific Issues**
**Camera Problems**:
- ✅ **Permissions**: Grant camera permissions to Self app
- ✅ **Clean Lens**: Clean camera lens
- ✅ **Good Device**: Use device with good camera quality

**Performance Issues**:
- ✅ **Free Memory**: Close other apps to free RAM
- ✅ **Battery**: Ensure device has sufficient battery
- ✅ **Storage**: Free up device storage space

## 📱 Step-by-Step Retry Process

### **Method 1: Optimal Document Scanning**
1. **Prepare Environment**:
   - Find well-lit area (natural light preferred)
   - Use clean, flat, dark surface
   - Ensure stable internet connection

2. **Document Preparation**:
   - Use passport (most reliable)
   - Clean document surface
   - Ensure document is not damaged or worn

3. **Scanning Process**:
   - Hold device steady
   - Capture entire document in frame
   - Ensure no shadows or glare
   - Wait for app to confirm good capture

4. **Selfie Process**:
   - Good lighting on face
   - Look directly at camera
   - Remove glasses/hat if requested
   - Follow app instructions precisely

### **Method 2: Network Troubleshooting**
1. **Check Connection**:
   ```bash
   # Test WebSocket connectivity
   ping websocket.self.xyz
   ```

2. **Try Different Networks**:
   - Switch from WiFi to mobile data
   - Try different WiFi network
   - Disable VPN/proxy

3. **Browser/App Reset**:
   - Clear browser cache
   - Restart Self app
   - Try different browser

## 🔧 Technical Debugging

### **Console Logs to Monitor**
```javascript
// Success indicators:
[WebSocket] Connected with id: xxx
[WebSocket] Mobile device connected
[WebSocket] Proof generation successful

// Failure indicators:
[WebSocket] Proof generation failed
[WebSocket] Mobile device disconnected
[WebSocket] Connection timeout
```

### **Common Error Types**
- `proof_generation_failed` → Document/photo quality issue
- `mobile_disconnected` → Network connectivity issue
- `timeout` → Slow network or processing issue
- `invalid_document` → Unsupported document type

## 🎯 Success Rate Optimization

### **Highest Success Rate Setup**:
1. **Document**: Valid passport
2. **Lighting**: Bright, even natural light
3. **Network**: Stable WiFi (>10 Mbps)
4. **Device**: Modern smartphone with good camera
5. **App**: Latest version of Self app
6. **Environment**: Quiet, well-lit room

### **Expected Success Rates**:
- **Passport + Good Conditions**: 95%+
- **Aadhaar + Good Conditions**: 85%+
- **Poor Lighting/Network**: 30-50%

## 🆘 If All Else Fails

### **Alternative Approaches**:
1. **Try Different Document**: Switch from Aadhaar to passport
2. **Different Device**: Use different smartphone
3. **Different Location**: Try different network/location
4. **Different Time**: Server load might be lower at different times

### **Contact Support**:
- **Self Protocol Support**: Check Self app for support options
- **Sonic SAT Support**: Use platform support channels

## 📊 Monitoring & Analytics

Track these metrics to identify patterns:
- Success rate by document type
- Success rate by time of day
- Network-related failures
- Device-specific issues

---

**Remember**: Self Protocol verification has a learning curve. Most users succeed on 2nd or 3rd attempt once they understand the requirements!
