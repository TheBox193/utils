// require('babel-regenerator-runtime');
window.React = require('react'); // Global React object

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });