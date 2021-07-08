import { mount } from '@vue/test-utils'
import Search from '@/components/Search.vue'

describe('Search.vue', () => {
  const wrapper = mount(Search)
  it('поиск работает', () => {
    const input = wrapper.find('input')
    input.text = 're'
    const result = wrapper.find('.search_input__result')
    console.log(result.html())
  })

  it('имеет кнопку', () => {
    expect(wrapper.contains('input')).toBe(true)
  })
})
