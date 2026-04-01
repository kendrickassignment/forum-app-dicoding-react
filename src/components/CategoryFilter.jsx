import PropTypes from 'prop-types';

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter" role="group" aria-label="Filter berdasarkan kategori">
      <span className="category-filter__label">Kategori:</span>
      <div className="category-filter__list">
        <button
          type="button"
          className={`category-filter__item ${selectedCategory === '' ? 'category-filter__item--active' : ''}`}
          onClick={() => onCategoryChange('')}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-filter__item ${selectedCategory === category ? 'category-filter__item--active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            #
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryFilter;
