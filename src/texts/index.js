import _ from 'lodash';
import texts from './texts';

class TextProvider {
  constructor() {
    this.texts = texts;
  }

  getText(moduleOrComponentName, constantName) {
    return _.get(
      this.texts,
      `${moduleOrComponentName}.${constantName}`,
      `${moduleOrComponentName}_${constantName}`
    );
  }
}

const textProvider = new TextProvider();
export default textProvider;
