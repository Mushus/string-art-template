import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThreadColors from '~/constants/threadColors';
import {
  TemplateProps,
  ThreadProps,
  loadFileResult,
} from '~/modules/data/internal';
import { TemplateProps as TemplatePropsSavedata } from '~/modules/data/current';

export interface ThreadUI {
  isActive: boolean;
}

export interface TemplateUI {
  isActive: boolean;
}

export interface State {
  templateIDs: string[];
  templates: { [k: string]: TemplateProps };
  templateUIs: { [k: string]: TemplateUI };
  templateLastID: number;
  threads: { [k: string]: ThreadProps };
  threadUIs: { [k: string]: ThreadUI };
  threadLastID: number;
  collapsed: string | null;
  templateEditorMenu: { elem: any; templateID: string } | null;
}

const initialState: State = {
  templateIDs: ['0'],
  templates: {
    '0': {
      id: '0',
      type: 'circle',
      name: '円形',
      visible: true,
      radius: 75,
      pinNum: 23,
      intervalRatio: 1,
      threads: [],
    },
  },
  templateUIs: {
    '0': {
      isActive: false,
    },
  },
  templateLastID: 0,
  threads: {},
  threadUIs: {},
  threadLastID: 0,
  collapsed: null,
  templateEditorMenu: null,
};

const editorModule = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateFromFile(state: State, action: PayloadAction<loadFileResult>) {
      const { templates, templateIDs, threads } = action.payload;
      state.templates = templates;
      state.templateIDs = templateIDs;
      state.threads = threads;
      state.templateUIs = Object.fromEntries(
        Object.keys(templates).map((i) => [i, { isActive: false }])
      );
      state.threadUIs = Object.fromEntries(
        Object.keys(threads).map((i) => [i, { isActive: false }])
      );
      state.templateLastID = Math.max(
        0,
        ...Object.keys(state.templates).map((i) => Number(i))
      );
      state.threadLastID = Math.max(
        0,
        ...Object.keys(state.threads).map((i) => Number(i))
      );
    },

    addShape(
      state: State,
      action: PayloadAction<TemplatePropsSavedata | undefined>
    ) {
      const id = String(++state.templateLastID);
      let template: TemplateProps = {
        type: 'none',
        id,
        name: '',
        visible: true,
      };
      const savedata = action.payload;
      if (savedata && 'threads' in savedata) {
        const threads: string[] = [];
        savedata.threads.forEach((thread) => {
          const threadID = String(++state.threadLastID);
          state.threads[threadID] = {
            id: threadID,
            ...thread,
          };
          state.threadUIs[threadID] = {
            isActive: true,
          };
          threads.push(threadID);
        });
        const { threads: _, ...savedataOmitThread } = savedata;
        template = { ...savedataOmitThread, id, threads };
      }
      state.templates[id] = template;
      state.templateUIs[id] = { isActive: false };
      state.templateIDs.push(id);
    },

    updateShape(state: State, action: PayloadAction<TemplateProps>) {
      const props = action.payload;
      const { id } = props;
      state.templates[id] = props;
    },

    moveShape(
      state: State,
      action: PayloadAction<{ templateID: string; moveTo: number }>
    ) {
      const { templateID, moveTo } = action.payload;
      const targetIndex = state.templateIDs.findIndex(
        (id) => id === templateID
      );
      if (targetIndex === -1) return;

      const swappedIndex = targetIndex + moveTo;
      if (swappedIndex < 0 || state.templateIDs.length <= swappedIndex) return;

      const a = state.templateIDs[targetIndex];
      const b = state.templateIDs[swappedIndex];
      state.templateIDs[targetIndex] = b;
      state.templateIDs[swappedIndex] = a;
    },

    removeShape(state: State, action: PayloadAction<string>) {
      const id = action.payload;
      state.templateIDs = state.templateIDs.filter((current) => current !== id);
    },

    addThread(state: State, action: PayloadAction<{ templateID: string }>) {
      const { templateID } = action.payload;
      const template = state.templates[templateID];
      if (!template || !('threads' in template)) return;
      const threadColorIndex = Math.floor(Math.random() * ThreadColors.length);
      const threadID = String(++state.threadLastID);
      state.threads[threadID] = {
        id: threadID,
        color: ThreadColors[threadColorIndex],
        patterns: [],
        start: 0,
        loopCount: 1000,
      };
      state.threadUIs[threadID] = {
        isActive: true,
      };
      template.threads.push(threadID);
    },

    updateThread(state: State, action: PayloadAction<ThreadProps>) {
      const props = action.payload;
      const { id } = action.payload;
      state.threads[id] = props;
    },

    removeThread(
      state: State,
      action: PayloadAction<{
        templateID: string;
        threadID: string;
      }>
    ) {
      const { templateID, threadID } = action.payload;
      const template = state.templates[templateID];
      if (!template || !('threads' in template)) return;
      template.threads = template.threads.filter(
        (current) => current !== threadID
      );
    },

    toggleCollapse(state: State, action?: PayloadAction<string>) {
      const id = action?.payload;
      if (state.collapsed === id || id == null) {
        state.collapsed = null;
      } else {
        state.collapsed = id;
      }
    },

    openMenu(
      state: State,
      action: PayloadAction<{ elem: any; templateID: string }>
    ) {
      state.templateEditorMenu = action.payload;
    },

    closeMenu(state: State) {
      state.templateEditorMenu = null;
    },
  },
});

export const actions = editorModule.actions;

export default editorModule;
