import {posts} from './data';
export const searchData = (query) => {
// console.log(query)
  return posts.filter((post) =>
  {
    // console.log(post.id.toLowerCase().includes(query.toLowerCase()))
   // console.log(post)
    return post.title.toLowerCase().includes(query.toLowerCase());
  });
}
// console.log(searchData('dynamic-routing'))