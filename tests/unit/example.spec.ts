import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import WeatherCard from '@/components/WeatherCard.vue';

describe('WeatherCard.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(WeatherCard, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
