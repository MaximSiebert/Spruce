require 'spec_helper'

describe 'Spruce theme frontend', theme: 'spruce', type: :feature, shared_session: true do
  it_behaves_like 'has logo support', image_max_height: 125, selector: '.logo'
  it_behaves_like 'page with social links', selector: '.social-link'
  # it_behaves_like 'has menu', dropdown_categories: true, open_mode: :click,
  #                 menu_item_selector: 'nav.menu .item',
  #                 category_item_selector: 'nav.menu .category',
  #                 wait_callback: proc {
  #                   if page.has_css?('.mobile-menu-toggle')
  #                     find('.mobile-menu-toggle').click
  #                   end
  #                 }
  it_behaves_like 'has gallery support', lazy_load: true
  it_behaves_like 'has listing support', lazy_load: true,
                  title_selector: '.title-element',
                  selector: '.asset'
  it_behaves_like 'has share support'
  it_behaves_like 'has "using format" support'
  it_behaves_like 'has secret pages support'
  it_behaves_like 'has content page support'
end
