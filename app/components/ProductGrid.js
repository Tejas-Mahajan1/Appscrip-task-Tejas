'use client'
import Image from 'next/image';
import styles from './ProductGrid.module.css';
import { useState, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { CiHeart } from "react-icons/ci";

export default function ProductGrid({ products = [] }) {
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    sort: 'RECOMMENDED'
  });

  const [wishlist, setWishlist] = useState(new Set());

  // Extract unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Calculate price range from products
  const priceStats = products.reduce((stats, product) => ({
    min: Math.min(stats.min, product.price),
    max: Math.max(stats.max, product.price)
  }), { min: Infinity, max: -Infinity });

  const filterSections = [
    {
      id: 'category',
      type: 'checkboxGroup',
      label: 'CATEGORIES',
      options: categories.map(cat => ({
        value: cat,
        label: cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)
      }))
    },
    {
      id: 'priceRange',
      type: 'range',
      label: 'PRICE RANGE',
      min: Math.floor(priceStats.min),
      max: Math.ceil(priceStats.max)
    },
    {
      id: 'rating',
      type: 'rating',
      label: 'RATING',
      options: [4, 3, 2, 1].map(rate => ({
        value: rate,
        label: `${rate} Stars & Above`
      }))
    }
  ];

  const sortOptions = [
    { value: 'RECOMMENDED', label: 'Recommended' },
    { value: 'PRICE_HIGH_LOW', label: 'Price: High to Low' },
    { value: 'PRICE_LOW_HIGH', label: 'Price: Low to High' },
    { value: 'RATING_HIGH_LOW', label: 'Rating: High to Low' },
    { value: 'MOST_REVIEWED', label: 'Most Reviewed' }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleFilterChange = (sectionId, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [sectionId]: value
    }));
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const renderFilterSection = (section) => {
    const isExpanded = expandedSections[section.id] !== false;

    return (
      <div key={section.id} className={styles.filterSection}>
        <button 
          className={`${styles.filterHeader} ${isExpanded ? styles.expanded : ''}`}
          onClick={() => toggleSection(section.id)}
        >
          {section.label}
          <span className={styles.expandIcon}>{isExpanded ? '−' : '+'}</span>
        </button>
        
        {isExpanded && (
          <div className={styles.filterContent}>
            {section.type === 'checkboxGroup' && (
              <div className={styles.checkboxGroup}>
                {section.options.map(option => (
                  <label key={option.value} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedFilters[section.id] === option.value}
                      onChange={() => handleFilterChange(section.id, option.value)}
                      className={styles.checkbox}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            )}
            
            {section.type === 'range' && (
              <div className={styles.priceRange}>
                <div className={styles.priceInputs}>
                  <input
                    type="text"
                    value={selectedFilters.priceRange.min}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      const numValue = value ? parseInt(value, 10) : section.min;
                      handleFilterChange('priceRange', {
                        ...selectedFilters.priceRange,
                        min: numValue
                      });
                    }}
                    placeholder="Min"
                    className={styles.priceInput}
                  />
                  <span>to</span>
                  <input
                    type="text"
                    value={selectedFilters.priceRange.max}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      const numValue = value ? parseInt(value, 10) : section.max;
                      handleFilterChange('priceRange', {
                        ...selectedFilters.priceRange,
                        max: numValue
                      });
                    }}
                    placeholder="Max"
                    className={styles.priceInput}
                  />
                </div>
              </div>
            )}

            {section.type === 'rating' && (
              <div className={styles.ratingGroup}>
                {section.options.map(option => (
                  <label key={option.value} className={styles.ratingLabel}>
                    <input
                      type="radio"
                      checked={selectedFilters.rating === option.value}
                      onChange={() => handleFilterChange('rating', option.value)}
                      className={styles.ratingRadio}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (selectedFilters.category !== 'all') {
      result = result.filter(product => product.category === selectedFilters.category);
    }

    // Apply price range filter
    result = result.filter(product => 
      product.price >= selectedFilters.priceRange.min && 
      product.price <= selectedFilters.priceRange.max
    );

    // Apply rating filter
    if (selectedFilters.rating > 0) {
      result = result.filter(product => product.rating.rate >= selectedFilters.rating);
    }

    // Apply sorting
    switch (selectedFilters.sort) {
      case 'PRICE_HIGH_LOW':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'PRICE_LOW_HIGH':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'RATING_HIGH_LOW':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'MOST_REVIEWED':
        result.sort((a, b) => b.rating.count - a.rating.count);
        break;
      // For 'RECOMMENDED', we'll keep the original order
    }

    setFilteredProducts(result);
  }, [products, selectedFilters]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <span className={styles.itemCount}>{filteredProducts.length} Items</span>
          <button 
            className={styles.hideFilter}
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            <IoIosArrowBack className={`${styles.filterArrow} ${!isFilterVisible ? styles.filterArrowRight : ''}`} />
            {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
          </button>
        </div>
        <div className={styles.rightHeader}>
          <button
            className={styles.mobileFilterButton}
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            Filters
          </button>
          <div className={styles.sortDropdown}>
            <select 
              value={selectedFilters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className={styles.select}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={`${styles.content} ${!isFilterVisible ? styles.contentFullWidth : ''}`}>
        <aside className={`${styles.sidebar} ${!isFilterVisible ? styles.sidebarHidden : ''} ${isMobileFilterOpen ? styles.sidebarMobileOpen : ''}`}>
          <div className={styles.mobileFilterHeader}>
            <h3>Filters</h3>
            <button 
              className={styles.closeFilterButton}
              onClick={() => setIsMobileFilterOpen(false)}
            >
              ✕
            </button>
          </div>
          {filterSections.map(renderFilterSection)}
        </aside>

        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <div className={styles.productDetails}>
                  <div className={styles.priceAndRating}>
                    <p className={styles.productPrice}>${product.price}</p>
                    <div className={styles.productRating}>
                      <span>★ {product.rating.rate}</span>
                      <span className={styles.ratingCount}>({product.rating.count})</span>
                    </div>
                  </div>
                  <button 
                    className={`${styles.wishlistButton} ${wishlist.has(product.id) ? styles.wishlistActive : ''}`}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <CiHeart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isMobileFilterOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}
    </div>
  );
} 