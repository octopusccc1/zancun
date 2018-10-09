import React from 'react';
import { Route, IndexRoute } from 'react-router';
import BasicForm from './components/BasicForm';
import AdvancedForm from './components/AdvancedForm';
import StepForm from './components/StepForm';
import Step1 from './components/StepForm/Step1';
import Step2 from './components/StepForm/Step2';
import Step3 from './components/StepForm/Step3';
export default (
  <Route path="formPage/">
    <IndexRoute component={BasicForm} />
    <Route path="basic/" component={BasicForm} />
    <Route path="advanced/" component={AdvancedForm} />
    <Route path="step/" component={StepForm}>
      <IndexRoute component={Step1} />
      <Route path="step1/" component={Step1}/>
      <Route path="step2/" component={Step2}/>
      <Route path="step3/" component={Step3}/>
    </Route>
  </Route>
);
