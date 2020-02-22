import {shallow} from 'enzyme';

import {ConditionalWrap} from '../ConditionalWrap';

describe('ConditionalWrap', () => {
	it('Should wrap when true', () => {
		const wrapper = shallow(
			<ConditionalWrap condition={true} wrap={children => <a href='/'>{children}</a>}>
				<img src='image.png' alt='' />
			</ConditionalWrap>
		);

		expect(wrapper.find('a').length).toBe(1);
		expect(wrapper.find('img').length).toBe(1);
	});
	it('Should not wrap when false', () => {
		const wrapper = shallow(
			<ConditionalWrap condition={false} wrap={children => <a href='/'>{children}</a>}>
				<img src='image.png' alt='' />
			</ConditionalWrap>
		);

		expect(wrapper.find('a').length).toBe(0);
		expect(wrapper.find('img').length).toBe(1);
	});
	it('Should not wrap when undefined', () => {
		const wrapper = shallow(
			<ConditionalWrap wrap={children => <a href='/'>{children}</a>}>
				<img src='image.png' alt='' />
			</ConditionalWrap>
		);

		expect(wrapper.find('a').length).toBe(0);
		expect(wrapper.find('img').length).toBe(1);
	});
});
