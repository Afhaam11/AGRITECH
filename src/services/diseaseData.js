export const RICE_DISEASES = [
  {
    name: 'Rice Blast',
    symptoms: 'Diamond-shaped lesions with gray centers and brown margins on leaves. Neck rot can cause panicle breakage.',
    severity: 'Critical',
    yieldLoss: '50-90%',
    treatments: [
      'Apply Tricyclazole fungicide (0.6g/L)',
      'Use resistant varieties like Pusa 6A',
      'Avoid excessive nitrogen fertilization',
      'Maintain proper water management'
    ],
    prevention: [
      'Use certified disease-free seeds',
      'Plant resistant varieties',
      'Maintain balanced nutrition',
      'Ensure proper field drainage'
    ]
  },
  {
    name: 'Bacterial Leaf Blight',
    symptoms: 'Water-soaked lesions along leaf margins that turn yellow then brown. Systemic infection can kill entire plants.',
    severity: 'High',
    yieldLoss: '20-50%',
    treatments: [
      'Apply Copper oxychloride (3g/L)',
      'Use Streptomycin sulfate (0.5g/L)',
      'Remove infected plant debris',
      'Improve field drainage'
    ],
    prevention: [
      'Use resistant varieties',
      'Avoid mechanical damage during cultivation',
      'Maintain proper water levels',
      'Practice crop rotation'
    ]
  },
  {
    name: 'Brown Spot',
    symptoms: 'Small, circular brown spots with yellow halos on leaves. Spots may coalesce to form larger brown areas.',
    severity: 'Medium',
    yieldLoss: '10-30%',
    treatments: [
      'Apply Mancozeb fungicide (2g/L)',
      'Use Propiconazole (1ml/L)',
      'Ensure adequate potassium nutrition',
      'Improve soil drainage'
    ],
    prevention: [
      'Use healthy, vigorous seeds',
      'Maintain balanced fertilization',
      'Avoid water stress',
      'Practice good field sanitation'
    ]
  },
  {
    name: 'False Smut',
    symptoms: 'Individual grains transform into large, green, velvety balls filled with dark powder (spores).',
    severity: 'Medium',
    yieldLoss: '5-25%',
    treatments: [
      'Apply Copper sulfate solution',
      'Use Propiconazole during flowering',
      'Remove infected panicles and burn',
      'Avoid excessive nitrogen during reproductive stage'
    ],
    prevention: [
      'Use certified clean seeds',
      'Avoid excessive nitrogen fertilization',
      'Maintain proper plant spacing',
      'Ensure good air circulation'
    ]
  },
  {
    name: 'Tungro Virus',
    symptoms: 'Yellow to orange leaf discoloration, stunted growth, and reduced tillering. Transmitted by green leafhoppers.',
    severity: 'Critical',
    yieldLoss: '70-100%',
    treatments: [
      'Control vector leafhoppers with insecticides',
      'Remove infected plants immediately',
      'Use reflective mulch to deter vectors',
      'Apply neem-based insecticides'
    ],
    prevention: [
      'Use resistant varieties',
      'Control leafhopper populations',
      'Remove wild rice and grassy weeds',
      'Practice synchronized planting'
    ]
  },
  {
    name: 'Sheath Blight',
    symptoms: 'Oval to irregular lesions on leaf sheaths near water line. Lesions have dark brown margins with white centers.',
    severity: 'High',
    yieldLoss: '15-40%',
    treatments: [
      'Apply Hexaconazole (2ml/L)',
      'Use Validamycin (2.5ml/L)',
      'Reduce plant density',
      'Improve air circulation'
    ],
    prevention: [
      'Avoid excessive nitrogen fertilization',
      'Maintain proper plant spacing',
      'Ensure good drainage',
      'Practice deep plowing'
    ]
  }
];

export const getDiseaseByName = (name) => {
  return RICE_DISEASES.find(disease => disease.name === name);
};

export const getAllDiseases = () => {
  return RICE_DISEASES;
};
