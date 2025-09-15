export interface Speaker {
  name: string;
  role: string;
  affiliation?: string;
  image: string;
  category: string;
}

export interface SpeakerCategory {
  title: string;
  speakers: Speaker[];
}
