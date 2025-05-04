export default class Utility {
  static formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value);
  }

  static getCategoryLabel = (categories, categoryId) => {
    return (
      categories?.find((category) => category._id === categoryId)?.label ||
      "Uncategorized"
    );
  };

  static getCategoryColor = (categories, categoryId) => {
    return (
      categories?.find((category) => category._id === categoryId)?.color ||
      "#cccccc"
    );
  };

  static getCategoryIconSrc = (categories, categoryId) => {
    const categoryLabel = this.getCategoryLabel(categories, categoryId);
    return `/icons/${categoryLabel.toLowerCase()}.svg`;
  };
}
