import data from './data.json';

export interface Projects {
  title: {
    text: string;
    githubLink: string | null;
    otherLink: string | null;
  };
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  which: string[];
}

export interface IProjects {
  title: string;
  list: Projects[];
}

export { data };
