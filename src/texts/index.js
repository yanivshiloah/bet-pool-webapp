import _ from 'lodash';
import {boundClass} from 'autobind-decorator';
import texts from './texts';

@boundClass
class TextProvider {
  constructor() {
    this.texts = texts;
  }

  getPoolsText(constantName) {
    return this.getText('pools', constantName);
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
