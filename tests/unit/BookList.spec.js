import { shallowMount } from '@vue/test-utils'
import BookList from '@/components/BookList.vue'
import books from '../books.json';

describe('BookList.vue', () => {
  it('renders book overlay', () => {
    const wrapper = shallowMount(BookList, {
      data: _ => { 
        return {
          books: books.books,
          filteredBooks: [],
        }
      },
      props: {
        searchInput: {
          type: String,
          default: ''
        },
        userFavBooks: {
          type: Array,
          default: _ => []
        }
      }
    });
    wrapper.find('.book').trigger('click');
    expect(wrapper.emitted('open-book-overlay')).toBeTruthy();

    wrapper.find('.book-upvote-btn').trigger('click');
    expect(wrapper.emitted('add-to-fav')).toBeTruthy();
  });
})
