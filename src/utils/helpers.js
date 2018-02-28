import moment from 'moment';

export const dateFormat = timestamp => {
  return moment(timestamp).format("DD-MM-YYYY")
};

export const sortPosts = (posts, sortBy) => {
  let postsSorted = posts.slice();
  if (sortBy === 'votes') {
    postsSorted.sort(function(a,b) {
      if (a.voteScore < b.voteScore) {
        return 1
      } else if (a.voteScore === b.voteScore) {
        return 0
      } else {
        return -1
      }
    })
  } else {
    postsSorted.sort(function(a, b) {
      if (a.timestamp < b.timestamp) {
        return 1
      } else if (a.timestamp === b.timestamp) {
        return 0
      } else {
        return -1
      }
    });
  }
  return postsSorted;
};

export const generateUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
