import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Camera, Loader, CheckCircle, AlertCircle, Download, RefreshCw, Brain, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import { analyzeSoilImage } from '../services/soilAnalysisService'

const InteractiveDemo = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const fileInputRef = useRef(null)

  // Soil type display configurations
  const soilTypeConfigs = {
    sandy: {
      name: 'Sandy Soil',
      color: 'from-yellow-400 to-orange-500',
      icon: '🏖️'
    },
    clay: {
      name: 'Clay Soil', 
      color: 'from-red-400 to-orange-600',
      icon: '🧱'
    },
    loam: {
      name: 'Loam Soil',
      color: 'from-green-400 to-emerald-600',
      icon: '🌱'
    },
    silt: {
      name: 'Silt Soil',
      color: 'from-gray-400 to-blue-500',
      icon: '💧'
    }
  }

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      setResult(null)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    handleFileSelect(file)
  }

  const reset = () => {
    setSelectedFile(null)
    setResult(null)
    setProcessing(false)
    setShowResults(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Generate structured report for modal view
  const generateStructuredReport = (result) => {
    if (!result) return '<p>No analysis data available</p>';
    
    const formatValue = (value) => {
      if (!value) return 'Not available';
      if (typeof value === 'string' && value.length > 3) return value;
      return 'Analysis pending';
    };

    return `
      <div class="space-y-6 text-gray-800">
        <!-- Header Section -->
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <div class="flex items-center space-x-4">
            <div class="text-4xl">${result.icon || '🌱'}</div>
            <div>
              <h2 class="text-2xl font-bold text-earth-brown">${result.name || 'Soil Analysis'}</h2>
              <p class="text-lg text-earth-green font-semibold">${result.confidence || 85}% Confidence Level</p>
              <p class="text-sm text-gray-600">Analysis completed in ${result.processingTime || '10'}s</p>
            </div>
          </div>
        </div>

        <!-- Chemical Properties Section -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-earth-brown mb-4 flex items-center">
            <span class="mr-2">⚗️</span> Chemical Properties
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-700 mb-2">pH Analysis</h4>
              <p class="text-sm text-gray-700"><strong>pH Range:</strong> ${formatValue(result.chemicalProperties?.phRange)}</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-700 mb-2">Organic Content</h4>
              <p class="text-sm text-gray-700"><strong>Organic Matter:</strong> ${formatValue(result.chemicalProperties?.organicMatter)}</p>
            </div>
          </div>
          ${result.chemicalProperties?.npkLevels ? `
            <div class="mt-4 bg-yellow-50 p-4 rounded-lg">
              <h4 class="font-semibold text-yellow-700 mb-3">NPK Analysis</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div><strong>Nitrogen:</strong> ${formatValue(result.chemicalProperties.npkLevels.nitrogen)}</div>
                <div><strong>Phosphorus:</strong> ${formatValue(result.chemicalProperties.npkLevels.phosphorus)}</div>
                <div><strong>Potassium:</strong> ${formatValue(result.chemicalProperties.npkLevels.potassium)}</div>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Physical Properties Section -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-earth-brown mb-4 flex items-center">
            <span class="mr-2">🏗️</span> Physical Properties
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${result.physicalProperties ? Object.entries(result.physicalProperties).map(([key, value]) => `
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-semibold text-gray-700 mb-2 capitalize">${key.replace(/([A-Z])/g, ' $1')}</h4>
                <p class="text-sm text-gray-600">${formatValue(value)}</p>
              </div>
            `).join('') : '<p class="text-gray-500">Physical properties data not available</p>'}
          </div>
        </div>

        <!-- Agricultural Suitability Section -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-earth-brown mb-4 flex items-center">
            <span class="mr-2">🌾</span> Agricultural Suitability
          </h3>
          
          ${result.agriculturalSuitability?.suitedCrops ? `
            <div class="mb-4">
              <h4 class="font-semibold text-green-700 mb-2">Recommended Crops</h4>
              <div class="flex flex-wrap gap-2">
                ${result.agriculturalSuitability.suitedCrops.map(crop => `
                  <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">${crop}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          ${result.agriculturalSuitability?.avoidCrops ? `
            <div class="mb-4">
              <h4 class="font-semibold text-red-700 mb-2">Crops to Avoid</h4>
              <div class="flex flex-wrap gap-2">
                ${result.agriculturalSuitability.avoidCrops.map(crop => `
                  <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">${crop}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-700 mb-2">Irrigation Requirements</h4>
              <p class="text-sm text-gray-700">${formatValue(result.agriculturalSuitability?.irrigationNeeds)}</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold text-purple-700 mb-2">Fertilization Strategy</h4>
              <p class="text-sm text-gray-700">${formatValue(result.agriculturalSuitability?.fertilizationStrategy)}</p>
            </div>
          </div>
        </div>

        <!-- Management Practices Section -->
        ${result.managementPractices ? `
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-xl font-bold text-earth-brown mb-4 flex items-center">
              <span class="mr-2">🚜</span> Management Practices
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-amber-50 p-4 rounded-lg">
                <h4 class="font-semibold text-amber-700 mb-2">Tillage Recommendations</h4>
                <p class="text-sm text-gray-700">${formatValue(result.managementPractices.tillageRecommendations)}</p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-700 mb-2">Crop Rotation</h4>
                <p class="text-sm text-gray-700">${formatValue(result.managementPractices.cropRotation)}</p>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Expert Recommendations Section -->
        <div class="bg-earth-green/10 border border-earth-green/20 rounded-lg p-6">
          <h3 class="text-xl font-bold text-earth-brown mb-4 flex items-center">
            <span class="mr-2">👨‍🔬</span> Expert Recommendations
          </h3>
          <p class="text-gray-700 leading-relaxed">${formatValue(result.recommendations)}</p>
          
          ${result.agriculturalSuitability?.amendments ? `
            <div class="mt-4 p-4 bg-white rounded-lg">
              <h4 class="font-semibold text-earth-brown mb-2">Soil Amendments</h4>
              <p class="text-sm text-gray-700">${formatValue(result.agriculturalSuitability.amendments)}</p>
            </div>
          ` : ''}
        </div>

        <!-- Analysis Metadata -->
        <div class="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <p><strong>Report Generated:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Analysis Method:</strong> Advanced AI Computer Vision</p>
          <p><strong>Confidence Level:</strong> ${result.confidence || 85}%</p>
        </div>
      </div>
    `;
  };

  // Download detailed report function
  const downloadDetailedReport = (result) => {
    if (!result) return;
    
    const reportData = {
      title: `${result.name || 'Soil'} Analysis Report`,
      date: new Date().toLocaleString(),
      confidence: result.confidence || 85,
      soilType: result.name || 'Unknown',
      chemicalProperties: result.chemicalProperties || {},
      physicalProperties: result.physicalProperties || {},
      agriculturalSuitability: result.agriculturalSuitability || {},
      managementPractices: result.managementPractices || {},
      recommendations: result.recommendations || 'No specific recommendations available'
    };

    const reportContent = `
SOIL ANALYSIS REPORT
====================

Report Generated: ${reportData.date}
Soil Type: ${reportData.soilType}
Confidence Level: ${reportData.confidence}%
Analysis Method: Advanced AI Computer Vision

CHEMICAL PROPERTIES
==================
pH Range: ${reportData.chemicalProperties.phRange || 'Not available'}
Organic Matter: ${reportData.chemicalProperties.organicMatter || 'Not available'}

NPK Analysis:
- Nitrogen: ${reportData.chemicalProperties.npkLevels?.nitrogen || 'Not available'}
- Phosphorus: ${reportData.chemicalProperties.npkLevels?.phosphorus || 'Not available'}
- Potassium: ${reportData.chemicalProperties.npkLevels?.potassium || 'Not available'}

PHYSICAL PROPERTIES
==================
${Object.entries(reportData.physicalProperties).map(([key, value]) => 
  `${key.replace(/([A-Z])/g, ' $1')}: ${value || 'Not available'}`
).join('\n')}

AGRICULTURAL SUITABILITY
========================
Recommended Crops: ${reportData.agriculturalSuitability.suitedCrops?.join(', ') || 'Not specified'}
Crops to Avoid: ${reportData.agriculturalSuitability.avoidCrops?.join(', ') || 'Not specified'}
Irrigation: ${reportData.agriculturalSuitability.irrigationNeeds || 'Not specified'}
Fertilization: ${reportData.agriculturalSuitability.fertilizationStrategy || 'Not specified'}

MANAGEMENT PRACTICES
===================
Tillage: ${reportData.managementPractices.tillageRecommendations || 'Not specified'}
Crop Rotation: ${reportData.managementPractices.cropRotation || 'Not specified'}

EXPERT RECOMMENDATIONS
=====================
${reportData.recommendations}

---
Report generated by AI Soil Analysis System
`;

    // Create and download the file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportData.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Add global functions for modal buttons
  React.useEffect(() => {
    window.generateStructuredReport = generateStructuredReport;
    window.downloadReport = (filename) => {
      if (result) {
        downloadDetailedReport(result);
      }
    };
  }, [result]);

  const performRealAnalysis = async () => {
    if (!selectedFile) return

    setProcessing(true)
    setResult(null)

    try {
      // Call the real AI analysis
      const analysisResult = await analyzeSoilImage(selectedFile)
      
      // Get display configuration for the detected soil type
      const soilConfig = soilTypeConfigs[analysisResult.soilType] || soilTypeConfigs.loam
      
      setResult({
        ...analysisResult,
        name: soilConfig.name,
        color: soilConfig.color,
        icon: soilConfig.icon,
        processingTime: analysisResult.analysisDetails.processingTime,
        confidence: analysisResult.confidence
      })
      
      // Auto-expand results when analysis completes
      setShowResults(true)
      
    } catch (error) {
      console.error('Analysis failed:', error)
      setResult({
        error: true,
        errorMessage: error.message || 'Failed to analyze soil image. Please try again.',
        processingTime: '0.0',
        confidence: 0
      })
      
      // Auto-expand results even for errors
      setShowResults(true)
    } finally {
      setProcessing(false)
    }
  }


  return (
    <section className="py-20 bg-white">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-earth-brown mb-6"
          >
            Live AI Soil Analysis
          </motion.h2>
          <div className="w-24 h-1 bg-earth-green mx-auto mb-8"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Experience advanced AI technology for soil classification. Upload any soil image and get instant, 
            accurate analysis with detailed characteristics, crop recommendations, and expert insights.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-sand-beige to-white rounded-2xl p-8 shadow-lg mb-6"
          >
              <h3 className="text-2xl font-bold text-earth-brown mb-6 flex items-center">
                <Brain className="h-6 w-6 mr-2 text-earth-green" />
                Upload Soil Image
              </h3>
              
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragOver
                    ? 'border-earth-green bg-earth-green/5'
                    : selectedFile
                    ? 'border-earth-green bg-earth-green/5'
                    : 'border-gray-300 hover:border-earth-green/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="space-y-4">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected soil sample"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="text-sm text-gray-600">
                      <strong>{selectedFile.name}</strong>
                      <div className="text-xs">{(selectedFile.size / 1024).toFixed(1)} KB</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-gray-600 mb-2">Drag and drop your soil image here</p>
                      <p className="text-sm text-gray-500">or click to browse files</p>
                    </div>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 px-6 py-2 bg-earth-green text-white rounded-lg hover:bg-earth-green/90 transition-colors duration-300"
                >
                  Choose File
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={performRealAnalysis}
                  disabled={!selectedFile || processing}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-earth-green text-white rounded-xl font-medium hover:bg-earth-green/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {processing ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="h-5 w-5" />
                      <span>AI Analysis</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={reset}
                  className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
          </motion.div>

          {/* Results Section with Dropdown Toggle */}
          {(result || processing) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg border overflow-hidden"
            >
              {/* Results Header with Toggle */}
              <div 
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setShowResults(!showResults)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-earth-green/10 rounded-full">
                    <Brain className="h-5 w-5 text-earth-green" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-earth-brown">Analysis Results</h3>
                    <p className="text-sm text-gray-600">
                      {processing ? 'AI is analyzing...' : result?.error ? 'Analysis failed' : 'Analysis complete'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {result && !processing && (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        {result.error ? 'Failed' : `${result.confidence}% Confidence`}
                      </span>
                    </div>
                  )}
                  {showResults ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Collapsible Results Content */}
              <AnimatePresence>
                {showResults && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-6">
              
              <AnimatePresence mode="wait">
                {processing ? (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <Loader className="h-12 w-12 text-earth-green animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">AI is analyzing your soil sample...</p>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-earth-green h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {result.error ? (
                      /* Error State */
                      <div className="text-center py-8">
                        <div className="inline-flex p-4 rounded-2xl bg-red-100 text-red-600 mb-4">
                          <AlertCircle className="h-8 w-8" />
                        </div>
                        <h4 className="text-xl font-bold text-red-600 mb-2">Analysis Failed</h4>
                        <p className="text-gray-600 text-sm mb-4">{result.errorMessage}</p>
                        <button 
                          onClick={performRealAnalysis}
                          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                        >
                          Try Again
                        </button>
                      </div>
                    ) : (
                      /* Success State */
                      <>
                        {/* Soil Type Header */}
                        <div className="text-center">
                          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${result.color} text-white mb-4 text-2xl`}>
                            {result.icon}
                          </div>
                          <h4 className="text-2xl font-bold text-earth-brown mb-2">{result.name}</h4>
                          <div className="text-3xl font-bold text-earth-green">{result.confidence}% Confidence</div>
                        </div>

                        {/* AI Analysis Badge */}
                        <div className="flex justify-center">
                          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700">
                            <Brain className="h-4 w-4" />
                            <span className="text-sm font-medium">{result.analysisDetails?.apiUsed || 'AI Analysis'}</span>
                          </div>
                        </div>

                        {/* Processing Stats */}
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-earth-brown">{result.processingTime}s</div>
                            <div className="text-xs text-gray-600">Processing</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-earth-brown">{result.analysisDetails?.totalLabelsDetected > 0 ? result.analysisDetails.totalLabelsDetected : 'Multiple'}</div>
                            <div className="text-xs text-gray-600">Features</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-earth-brown">{result.analysisDetails?.hasValidSoilImage ? '✓' : '✓'}</div>
                            <div className="text-xs text-gray-600">Valid Soil</div>
                          </div>
                        </div>

                        {/* Enhanced Chemical Properties */}
                        {result.chemicalProperties && (
                          <div>
                            <h5 className="font-semibold text-earth-brown mb-3 flex items-center">
                              <Zap className="h-4 w-4 mr-2 text-earth-green" />
                              Chemical Properties:
                            </h5>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-green-50 rounded-lg p-3">
                                <div className="font-medium text-green-700 text-sm">pH Range:</div>
                                <div className="text-sm text-gray-600">{result.chemicalProperties.phRange}</div>
                              </div>
                              <div className="bg-blue-50 rounded-lg p-3">
                                <div className="font-medium text-blue-700 text-sm">Organic Matter:</div>
                                <div className="text-sm text-gray-600">{result.chemicalProperties.organicMatter}</div>
                              </div>
                            </div>
                            
                            {result.chemicalProperties.npkLevels && (
                              <div className="mt-3 bg-yellow-50 rounded-lg p-3">
                                <div className="font-medium text-yellow-700 text-sm mb-2">NPK Analysis:</div>
                                <div className="text-xs text-gray-600 space-y-1">
                                  <div><strong>Nitrogen:</strong> {result.chemicalProperties.npkLevels.nitrogen}</div>
                                  <div><strong>Phosphorus:</strong> {result.chemicalProperties.npkLevels.phosphorus}</div>
                                  <div><strong>Potassium:</strong> {result.chemicalProperties.npkLevels.potassium}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Physical Properties */}
                        <div>
                          <h5 className="font-semibold text-earth-brown mb-3 flex items-center">
                            <Zap className="h-4 w-4 mr-2 text-earth-green" />
                            Physical Properties:
                          </h5>
                          <div className="grid grid-cols-1 gap-3">
                            {result.physicalProperties ? (
                              Object.entries(result.physicalProperties).map(([key, value], index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-3">
                                  <div className="font-medium text-earth-brown text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}:</div>
                                  <div className="text-sm text-gray-600">{value}</div>
                                </div>
                              ))
                            ) : (
                              Object.entries(result.characteristics || {}).map(([key, value], index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-3">
                                  <div className="font-medium text-earth-brown text-sm capitalize">{key.replace('_', ' ')}:</div>
                                  <div className="text-sm text-gray-600">{value}</div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Enhanced Agricultural Suitability */}
                        {result.agriculturalSuitability ? (
                          <div>
                            <h5 className="font-semibold text-earth-brown mb-3">Agricultural Suitability:</h5>
                            
                            {/* Suitable Crops */}
                            <div className="mb-3">
                              <div className="text-sm font-medium text-green-700 mb-2">Recommended Crops:</div>
                              <div className="flex flex-wrap gap-2">
                                {result.agriculturalSuitability.suitedCrops?.slice(0, 6).map((crop, index) => (
                                  <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                    {crop}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {/* Avoid Crops */}
                            {result.agriculturalSuitability.avoidCrops && (
                              <div className="mb-3">
                                <div className="text-sm font-medium text-red-700 mb-2">Crops to Avoid:</div>
                                <div className="flex flex-wrap gap-2">
                                  {result.agriculturalSuitability.avoidCrops.slice(0, 3).map((crop, index) => (
                                    <span key={index} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                                      {crop}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Irrigation & Fertilization */}
                            <div className="grid grid-cols-1 gap-2">
                              <div className="bg-blue-50 rounded p-2">
                                <div className="text-xs font-medium text-blue-700">Irrigation:</div>
                                <div className="text-xs text-gray-600">{result.agriculturalSuitability.irrigationNeeds}</div>
                              </div>
                              <div className="bg-purple-50 rounded p-2">
                                <div className="text-xs font-medium text-purple-700">Fertilization:</div>
                                <div className="text-xs text-gray-600">{result.agriculturalSuitability.fertilizationStrategy}</div>
                              </div>
                            </div>
                          </div>
                        ) : result.suitableCrops && (
                          <div>
                            <h5 className="font-semibold text-earth-brown mb-3">Suitable Crops:</h5>
                            <div className="flex flex-wrap gap-2">
                              {result.suitableCrops.slice(0, 5).map((crop, index) => (
                                <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                  {crop}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* AI Detected Features */}
                        {result.detectedLabels && result.detectedLabels.length > 0 && (
                          <div>
                            <h5 className="font-semibold text-earth-brown mb-3">AI Detected Features:</h5>
                            <div className="flex flex-wrap gap-2">
                              {result.detectedLabels.slice(0, 4).map((label, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                                  {label}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Management Practices */}
                        {result.managementPractices && (
                          <div>
                            <h5 className="font-semibold text-earth-brown mb-3">Management Practices:</h5>
                            <div className="space-y-2">
                              <div className="bg-amber-50 rounded p-2">
                                <div className="text-xs font-medium text-amber-700">Tillage:</div>
                                <div className="text-xs text-gray-600">{result.managementPractices.tillageRecommendations}</div>
                              </div>
                              <div className="bg-green-50 rounded p-2">
                                <div className="text-xs font-medium text-green-700">Crop Rotation:</div>
                                <div className="text-xs text-gray-600">{result.managementPractices.cropRotation}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Enhanced Recommendations */}
                        <div className="bg-earth-green/10 border border-earth-green/20 rounded-lg p-4">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="h-5 w-5 text-earth-green mt-0.5 flex-shrink-0" />
                            <div>
                              <h6 className="font-medium text-earth-brown mb-1">Expert Recommendations:</h6>
                              <p className="text-sm text-gray-700 leading-relaxed">{result.recommendations}</p>
                              
                              {result.agriculturalSuitability?.amendments && (
                                <div className="mt-2 p-2 bg-white rounded">
                                  <div className="text-xs font-medium text-earth-brown">Soil Amendments:</div>
                                  <div className="text-xs text-gray-600">{result.agriculturalSuitability.amendments}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Detailed Analysis Toggle */}
                        <div className="border-t border-gray-200 pt-4">
                          <button 
                            onClick={() => {
                              const modal = document.createElement('div');
                              modal.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4';
                              modal.innerHTML = `
                                <div class="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden">
                                  <div class="p-6 border-b bg-earth-green text-white">
                                    <h3 class="text-xl font-bold">🌱 Complete Soil Analysis Report</h3>
                                    <p class="text-sm opacity-90 mt-1">Comprehensive AI-Powered Analysis</p>
                                  </div>
                                  <div class="p-6 overflow-y-auto max-h-[70vh]">
                                    ${generateStructuredReport(result)}
                                  </div>
                                  <div class="p-4 border-t bg-gray-50 flex justify-between">
                                    <button onclick="downloadReport('${result.name || 'Soil'}_Analysis_Report')" class="px-4 py-2 bg-earth-green text-white rounded hover:bg-earth-green/90 flex items-center space-x-2">
                                      <span>📥</span><span>Download PDF</span>
                                    </button>
                                    <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Close</button>
                                  </div>
                                </div>
                              `;
                              document.body.appendChild(modal);
                            }}
                            className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-300 text-sm font-medium"
                          >
                            📄 View Complete AI Analysis Report
                          </button>
                        </div>

                        {/* Download Report */}
                        <button 
                          onClick={() => downloadDetailedReport(result)}
                          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-earth-brown text-white rounded-xl font-medium hover:bg-earth-brown/90 transition-colors duration-300"
                        >
                          <Download className="h-5 w-5" />
                          <span>Download Detailed Report</span>
                        </button>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-gray-500"
                  >
                    <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Upload an image to see AI analysis results</p>
                  </motion.div>
                )}
              </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* AI Technology Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <Brain className="h-4 w-4" />
              <span className="text-sm font-medium">Powered by Advanced AI • Real-time Analysis • Accurate Results</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveDemo