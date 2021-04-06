"use strict";

import './styles/common.sass';

import * as dat from 'dat.gui';

const CONFIG = {
  'rotate-x': 0,
  'rotate-y': 0,
}

const BOUNDS = {
  'rotate-x': [-360, 360, 1],
  'rotate-y': [-360, 360, 1],
}

const CONTROLLER = new dat.GUI()

const UPDATE = () => {
  for (const KEY of Object.keys(CONFIG)) {
    document.documentElement.style.setProperty(`--${KEY}`, CONFIG[KEY])
  }
}

const digest = (CONFIG_OBJECT, BOUNDS_OBJECT, FOLDER) => {
  for (const category in BOUNDS_OBJECT) {
    if (Array.isArray(BOUNDS_OBJECT[category])) {
      FOLDER.add(
        CONFIG_OBJECT,
        category,
        BOUNDS_OBJECT[category][0],
        BOUNDS_OBJECT[category][1],
        BOUNDS_OBJECT[category][2] ? BOUNDS_OBJECT[category][2] : 1
      ).onChange(UPDATE)
    } else {
      const NEW_FOLDER = FOLDER
        ? FOLDER.addFolder(category)
        : GUI.addFolder(category)
      digest(CONFIG_OBJECT[category], BOUNDS_OBJECT[category], NEW_FOLDER)
    }
  }
}
digest(CONFIG, BOUNDS, CONTROLLER)
