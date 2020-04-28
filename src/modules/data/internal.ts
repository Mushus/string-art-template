import { parseData, Data } from './current';

export interface PropsNone {
  id: string;
  type: 'none';
}

export interface PropsCircle {
  id: string;
  type: 'circle';
  radius: number;
  pinNum: number;
  intervalRatio: number;
  threads: string[];
}

export interface PropsPolygon {
  id: string;
  type: 'polygon';
  radius: number;
  vertexNum: number;
  pinNum: number;
  threads: string[];
}

export interface PropsStar {
  id: string;
  type: 'star';
  outerRadius: number;
  innerRadius: number;
  vertexNum: number;
  pinNum: number;
  threads: string[];
}

export type ValidTemplateProps = PropsCircle | PropsPolygon | PropsStar;
export type TemplateProps = PropsNone | ValidTemplateProps;

export interface ThreadProps {
  id: string;
  color: string;
  patterns: string[];
  start: number;
  loopCount: number;
}

export interface loadFileResult {
  templates: { [k: string]: TemplateProps };
  templateIDs: string[];
  threads: { [k: string]: ThreadProps };
}
export const loadFile = (data: string): loadFileResult => {
  const obj = JSON.parse(data);
  const saveData = parseData(obj);
  const threads: { [k: string]: ThreadProps } = {};
  const templates: { [k: string]: TemplateProps } = {};
  const templateIDs: string[] = [];
  let templateID = 0;
  let threadID = 0;
  saveData.templates.forEach((template) => {
    if (template.type === 'none') {
      templates[templateID] = { ...template, id: String(templateID) };
    } else {
      const threadIDs: string[] = [];
      template.threads.forEach((thread) => {
        threads[threadID] = { ...thread, id: String(threadID) };
        threadIDs.push(String(threadID++));
      });
      templates[templateID] = {
        ...template,
        id: String(templateID),
        threads: threadIDs,
      };
    }
    templateIDs.push(String(templateID++));
  });
  return { templates, templateIDs, threads };
};

export const saveFile = (
  templateIDs: string[],
  templates: { [k: string]: TemplateProps },
  threads: { [k: string]: ThreadProps }
): Data => {
  const templatesData = templateIDs.map((i) => {
    const template = templates[i];
    if (template.type === 'none') {
      return template;
    }
    return {
      ...template,
      threads: template.threads.map((i) => threads[i]),
    };
  });
  return {
    version: 2,
    templates: templatesData,
  };
};
