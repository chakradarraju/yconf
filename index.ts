import { isMap, isSeq, YAMLMap, YAMLSeq } from "yaml";

const {readFileSync} = require('fs');
const yaml = require('yaml');

exports.YConfig = class {
  config: YAMLMap;
  inited: boolean;
  error: boolean;
  
  constructor() {
    this.config = null;
    this.inited = false;
    this.error = false;
  }

  loadFile(filename: string): void {
    this.loadConfig(readFileSync(filename, 'utf8'));
  }

  loadConfig(config: string): void {
    if (this.inited) {
      console.error('Already loaded config');
      return;
    }
    try {
      this.config = yaml.parseAllDocuments(config)[0].contents;
    } catch (e) {
      console.error('Caught exception loading config', e);
      this.error = true;
    }
    this.inited = true;
  }

  getOrDefault(path: string, defaultValue: any): any {
    return this._getOrDefault(path.split('.'), defaultValue, this.config);
  }

  _getOrDefault<T = unknown>(path: Array<string>, defaultValue: any, doc: YAMLMap<unknown, T> | YAMLSeq<T>): any {
    const key = path.shift();
    const value = doc.get(key);
    if (path.length === 0 && value) return value;
    if ((isMap(value) || isSeq(value)) && path.length > 0) {
      return this._getOrDefault(path, defaultValue, value);  
    }
    return defaultValue;
  }
};
