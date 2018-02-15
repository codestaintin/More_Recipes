import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Footer from '../../../src/components/partials/Footer.jsx';

configure({ adapter: new Adapter() });

describe('<Footer>', () => {
  let shallowComponent;
  beforeEach(() => {
    shallowComponent = shallow(<Footer/>);
  });
  it('renders <Footer> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });
});
