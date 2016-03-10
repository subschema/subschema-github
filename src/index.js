"use strict";
import Login from './Login.jsx';
import LoginStyle from './Login.less';
import GithubProcessor from './GithubProcessor';
import ProcessorSelect from './ProcessorSelect';
import ExpressionLegendTemplate from './ExpressionLegendTemplate.jsx';
import _github from './github';
import {loaderFactory} from 'Subschema';

const loader = loaderFactory();

export const github = _github;

loader.addType({Login, ProcessorSelect});
loader.addStyle({Login: LoginStyle});
loader.addProcessor({GithubProcessor});
loader.addTemplate({ExpressionLegendTemplate});

export default loader;