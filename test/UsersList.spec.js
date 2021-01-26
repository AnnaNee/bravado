import { mount } from '@vue/test-utils'
import UsersList from '@/components/UsersList.vue'

describe('UsersList', () => {
  it('renders empty list when no users prop is passed', () => {
    const wrapper = mount(UsersList)

    expect(wrapper.props('users').length).toEqual(0)
  })

  it('renders users list when component finish mount', () => {
    const wrapper = mount(UsersList, {
      propsData: { users: usersMock },
    })

    const findByAttribute = (attr) =>
      wrapper.find(`[data-test-id="${attr}"]`).text()

    expect(findByAttribute('email')).toBe('anna_would_love_to_work@bravado.co')
    expect(findByAttribute('name')).toBe('Anna')
    expect(findByAttribute('address')).toBe('A nice beach, Brazil')
    expect(findByAttribute('title')).toBe('A Humble Software Engineer')
    expect(findByAttribute('city')).toBe('São Paulo')
  })

  it('emits an event when scrolled to bottom', async () => {
    const wrapper = mount(UsersList, {
      propsData: { users: usersMock },
    })

    await wrapper.find('[data-test-id="list"]').trigger('scroll')

    expect(wrapper.emitted('on-users-list-end')).toHaveLength(1)
  })

  const usersMock = [
    {
      name: 'Anna',
      email: 'anna_would_love_to_work@bravado.co',
      avatar: 'img_url',
      address: 'A nice beach, Brazil',
      title: 'A Humble Software Engineer',
      city: 'São Paulo',
    },
  ]
})
