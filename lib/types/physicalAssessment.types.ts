export const BoulderingGrades = {
  V1: 'V1',
  V2: 'V2',
  V3: 'V3',
  V4: 'V4',
  V5: 'V5',
  V6: 'V6',
  V7: 'V7',
  V8: 'V8',
  V9: 'V9',
  V10: 'V10',
  V11: 'V11',
  V12: 'V12',
} as const;

export type BoulderingGrade = typeof BoulderingGrades[keyof typeof BoulderingGrades];

export const LeadGrades = {
  '3': '3',
  '4-': '4-',
  '4': '4',
  '4+': '4+',
  '5': '5',
  '5+': '5+',
  '6A': '6A',
  '6A+': '6A+',
  '6B': '6B',
  '6B+': '6B+',
  '6C': '6C',
  '6C+': '6C+',
  '7A': '7A',
  '7A+': '7A+',
  '7B': '7B',
  '7B+': '7B+',
  '7C': '7C',
  '7C+': '7C+',
  '8A': '8A',
  '8A+': '8A+',
  '8B': '8B',
  '8B+': '8B+',
  '8C': '8C',
  '8C+': '8C+',
  '9A': '9A',
  '9A+': '9A+',
  '9B': '9B',
  '9B+': '9B+',
  '9C': '9C',
} as const;

export type LeadGrade = typeof LeadGrades[keyof typeof LeadGrades];

export type ClimbingGrades = {
  boulderingHighestGrade: BoulderingGrade;
  leadHighestGrade: LeadGrade;
}

export const GripSizes = {
  '6mm': '6mm',
  '8mm': '8mm',
  '10mm': '10mm',
  '12mm': '12mm',
  '14mm': '14mm',
  '16mm': '16mm',
  '18mm': '18mm',
  '20mm': '20mm',
  '22mm': '22mm',
  '24mm': '24mm',
  '26mm': '26mm',
  '28mm': '28mm',
  '30mm': '30mm',
  '32mm': '32mm',
};
export type GripSize = typeof GripSizes[keyof typeof GripSizes];
export type OneToTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type FingerStrength = {
  gripSize: GripSize;
  weight: number;
  difficulty: OneToTen;
}

export type MaxPullUps = {
  repetitions: number;
  difficulty: OneToTen;
}

export type MaxPushUps = {
  repetitions: number;
  difficulty: OneToTen;
}

export type ToesToBar = {
  repetitions: number;
  difficulty: OneToTen;
}

export type LegsSpread = {
  maxDistance: string;
  difficulty: OneToTen;
}

export type HomeEquipment = {
  homeWall: boolean;
  trxOrRings: boolean;
  FingerBoard: boolean;
}

export type RestDay = 'Rest';
export type TrainingDay = {
  location: 'Outdoor' | 'Wall' | 'Home';
  duration: 'Short' | 'Long';
}

export type ScheduleDay = RestDay | TrainingDay;

export const Weekday = {
  SUNDAY: 'Sunday',
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
} as const;

export type Weekday = typeof Weekday[keyof typeof Weekday];

export type Schedule = Record<Weekday, ScheduleDay>;

export type GeneralComments = string;

export type PhysicalAssessment = {
  climbingGrades: ClimbingGrades;
  fingerStrength: FingerStrength;
  maxPullUps: MaxPullUps;
  maxPushUps: MaxPushUps;
  toesToBar: ToesToBar;
  legsSpread: LegsSpread;
  homeEquipment: HomeEquipment;
  schedule: Schedule;
  generalComments: GeneralComments;
}
