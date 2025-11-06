// Smart soil analysis service with AI fallback systems
import { analyzeImageSoil } from './smartSoilAnalysis.js';
import { analyzeWithGemini } from './geminiSoilAnalysis.js';

// Soil classification knowledge base
const soilClassificationRules = {
  sandy: {
    name: 'Sandy Soil',
    keywords: ['sand', 'granular', 'coarse', 'gritty', 'light', 'loose'],
    colors: ['light brown', 'tan', 'beige', 'yellow', 'white'],
    texture_indicators: ['individual grains', 'particles', 'rough surface'],
    characteristics: {
      drainage: 'Excellent - water drains quickly',
      water_retention: 'Poor - requires frequent irrigation',
      aeration: 'Excellent - roots get plenty of oxygen',
      workability: 'Easy to work when moist',
      nutrients: 'Low nutrient retention',
      warming: 'Warms up quickly in spring'
    },
    crops_suitable: ['Carrots', 'Potatoes', 'Tomatoes', 'Herbs', 'Root vegetables'],
    recommendations: 'Add organic matter like compost to improve water retention and nutrient holding capacity.'
  },
  clay: {
    name: 'Clay Soil',
    keywords: ['clay', 'sticky', 'heavy', 'dense', 'compact', 'fine'],
    colors: ['red', 'brown', 'gray', 'blue-gray', 'dark'],
    texture_indicators: ['smooth surface', 'cracks when dry', 'plastic when wet'],
    characteristics: {
      drainage: 'Poor - water pools on surface',
      water_retention: 'Excellent - holds water very well',
      aeration: 'Poor - can become waterlogged',
      workability: 'Difficult - sticky when wet, hard when dry',
      nutrients: 'High nutrient retention',
      warming: 'Slow to warm up in spring'
    },
    crops_suitable: ['Broccoli', 'Cabbage', 'Beans', 'Lettuce', 'Perennial crops'],
    recommendations: 'Improve drainage by adding organic matter, sand, or creating raised beds. Avoid working when wet.'
  },
  loam: {
    name: 'Loam Soil',
    keywords: ['loam', 'balanced', 'mixed', 'fertile', 'crumbly', 'ideal'],
    colors: ['dark brown', 'rich brown', 'chocolate', 'black'],
    texture_indicators: ['crumbly texture', 'forms loose ball', 'well-structured'],
    characteristics: {
      drainage: 'Good - drains well but retains moisture',
      water_retention: 'Good - balanced water holding',
      aeration: 'Good - optimal air spaces',
      workability: 'Easy to work in most conditions',
      nutrients: 'Good nutrient retention',
      warming: 'Moderate warming rate'
    },
    crops_suitable: ['Most vegetables', 'Flowers', 'Shrubs', 'Trees', 'Lawn grass'],
    recommendations: 'Maintain with regular organic matter additions. This is ideal soil for most plants.'
  },
  silt: {
    name: 'Silt Soil',
    keywords: ['silt', 'smooth', 'silky', 'fine', 'powder', 'flour'],
    colors: ['gray', 'light brown', 'beige', 'tan'],
    texture_indicators: ['smooth feel', 'holds shape when moist', 'fine particles'],
    characteristics: {
      drainage: 'Moderate - can become compacted',
      water_retention: 'Good - holds moisture well',
      aeration: 'Moderate - can become dense',
      workability: 'Good when properly managed',
      nutrients: 'Good nutrient retention',
      warming: 'Moderate warming rate'
    },
    crops_suitable: ['Perennial crops', 'Pasture grasses', 'Some vegetables'],
    recommendations: 'Add organic matter to improve structure and prevent compaction. Avoid working when wet.'
  }
};

// Convert image to base64
const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

// Analyze soil characteristics from image with smart AI system
export const analyzeSoilImage = async (imageFile) => {
  console.log('Starting soil image analysis...');
  
  // Primary: Enhanced Gemini AI analysis
  try {
    console.log('🤖 Starting Enhanced Gemini AI Analysis...');
    const geminiResult = await analyzeWithGemini(imageFile);
    console.log('✅ Enhanced Gemini AI Analysis successful!');
    return geminiResult;
    
  } catch (geminiError) {
    console.log('Gemini AI Analysis failed, using Smart Analysis Engine...');
    
    // Fallback: Smart offline analysis
    try {
      console.log('🧠 Starting Smart Analysis Engine...');
      const smartResult = await analyzeImageSoil(imageFile);
      console.log('✅ Smart Analysis Engine successful!');
      return smartResult;
      
    } catch (smartError) {
      console.error('All analysis methods failed:', smartError);
      throw new Error('Unable to analyze soil image: All analysis systems failed');
    }
  }
};

// Get soil recommendations based on type
export const getSoilRecommendations = (soilType) => {
  const lowerType = soilType.toLowerCase();
  
  for (const [key, value] of Object.entries(soilClassificationRules)) {
    if (lowerType.includes(key) || value.keywords.some(keyword => lowerType.includes(keyword))) {
      return {
        type: value.name,
        characteristics: value.characteristics,
        crops_suitable: value.crops_suitable,
        recommendations: value.recommendations,
        keywords: value.keywords
      };
    }
  }
  
  // Default recommendations for unknown soil types
  return {
    type: 'Unknown Soil Type',
    characteristics: {
      drainage: 'Variable - depends on soil composition',
      water_retention: 'Variable - test with small water application',
      aeration: 'Variable - observe after watering',
      workability: 'Test soil consistency when moist',
      nutrients: 'Soil test recommended',
      warming: 'Variable - depends on color and drainage'
    },
    crops_suitable: ['Test with hardy plants first', 'Consult local extension office'],
    recommendations: 'Conduct a professional soil test to determine exact composition and pH levels.',
    keywords: ['unknown', 'mixed', 'variable']
  };
};

// Enhanced soil analysis with multiple data sources
export const getDetailedSoilAnalysis = async (imageFile) => {
  try {
    console.log('Starting detailed soil analysis...');
    
    const startTime = Date.now();
    const analysis = await analyzeSoilImage(imageFile);
    const processingTime = Date.now() - startTime;
    
    // Enhance the analysis with additional recommendations
    const recommendations = getSoilRecommendations(analysis.soilType || 'unknown');
    
    return {
      ...analysis,
      detailedRecommendations: recommendations,
      processingTime: `${processingTime}ms`,
      analysisTimestamp: new Date().toISOString(),
      confidence: analysis.confidence || 'High',
      additionalInfo: {
        analysisMethod: analysis.apiUsed || 'Smart Analysis',
        imageSize: `${imageFile.size} bytes`,
        imageType: imageFile.type,
        recommendations: {
          immediate: getImmediateActions(analysis.soilType),
          seasonal: getSeasonalActions(analysis.soilType),
          longTerm: getLongTermActions(analysis.soilType)
        }
      }
    };
    
  } catch (error) {
    console.error('Detailed analysis failed:', error);
    throw new Error(`Analysis failed: ${error.message}`);
  }
};

// Get immediate actions based on soil type
const getImmediateActions = (soilType) => {
  const type = soilType?.toLowerCase() || '';
  
  if (type.includes('sand')) {
    return [
      'Check soil moisture regularly',
      'Apply mulch to retain moisture',
      'Consider drip irrigation setup'
    ];
  } else if (type.includes('clay')) {
    return [
      'Avoid walking on wet soil',
      'Improve drainage with organic matter',
      'Create raised beds if needed'
    ];
  } else if (type.includes('loam')) {
    return [
      'Maintain current soil health',
      'Add compost seasonally',
      'Monitor for any changes'
    ];
  }
  
  return [
    'Test soil pH levels',
    'Observe drainage after watering',
    'Consult local gardening experts'
  ];
};

// Get seasonal actions based on soil type
const getSeasonalActions = (soilType) => {
  const type = soilType?.toLowerCase() || '';
  
  if (type.includes('sand')) {
    return {
      spring: 'Add compost and organic fertilizer',
      summer: 'Increase watering frequency, add mulch',
      fall: 'Plant cover crops to add organic matter',
      winter: 'Plan drainage improvements for next year'
    };
  } else if (type.includes('clay')) {
    return {
      spring: 'Add organic matter, avoid working when wet',
      summer: 'Mulch heavily to prevent cracking',
      fall: 'Add coarse organic matter and sand',
      winter: 'Plan raised bed installation'
    };
  } else if (type.includes('loam')) {
    return {
      spring: 'Light cultivation and compost addition',
      summer: 'Regular watering and maintenance',
      fall: 'Add organic matter and prepare for winter',
      winter: 'Minimal intervention needed'
    };
  }
  
  return {
    spring: 'Conduct professional soil test',
    summer: 'Monitor plant performance',
    fall: 'Prepare soil improvements',
    winter: 'Plan next year\'s garden'
  };
};

// Get long-term actions based on soil type
const getLongTermActions = (soilType) => {
  const type = soilType?.toLowerCase() || '';
  
  if (type.includes('sand')) {
    return [
      'Establish permanent mulching system',
      'Install efficient irrigation',
      'Build soil organic matter over 2-3 years',
      'Consider windbreaks to prevent erosion'
    ];
  } else if (type.includes('clay')) {
    return [
      'Install permanent drainage system',
      'Build raised beds for better drainage',
      'Gradually improve soil structure with organic amendments',
      'Consider soil aeration systems'
    ];
  } else if (type.includes('loam')) {
    return [
      'Maintain soil health with regular organic matter',
      'Rotate crops to prevent nutrient depletion',
      'Monitor and maintain optimal pH levels',
      'Preserve soil structure through good practices'
    ];
  }
  
  return [
    'Develop comprehensive soil improvement plan',
    'Consider professional soil consultation',
    'Monitor soil changes over time',
    'Document what works best for your conditions'
  ];
};

export default {
  analyzeSoilImage,
  getSoilRecommendations,
  getDetailedSoilAnalysis
};