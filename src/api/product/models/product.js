// module.exports = {
//     lifecycles: {
//       async beforeUpdate(params, data) {
//         // Check if the title field is being updated
//         if (data.title) {
//           // Generate a new slug based on the updated title
//           const newSlug = generateSlug(data.title);
  
//           // Set the new slug to the UID field
//           data.slug = newSlug;
//         }
//       }
//     }
//   };
  
//   // Function to generate a slug from a string (you might want to implement this function)
//   function generateSlug(title) {
//     // Implement your slug generation logic here
//     // For example, you can use a library like `slugify`
//     // Example using 'slugify' library:
//     // const slug = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g });
//     // return slug;
  
//     // For simplicity, let's assume a basic slug generation without special characters
//     return title.toLowerCase().replace(/\s+/g, '-');
//   }