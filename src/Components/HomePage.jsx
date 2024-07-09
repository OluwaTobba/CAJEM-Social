import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaThumbsUp, FaCommentAlt, FaShare } from 'react-icons/fa';
import Navbar from './Navbar';

function HomePage() {

  const [posts, setPosts] = useState([
    { id: 1, content: 'HELLO WORLD!', likes: 20, comments: 2, shares: 1, user: 'MinisterCAJEM' },
    { id: 2, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius, purus vel tempor tempor, nibh nibh congue augue, sed pretium lectus nisl sed tellus. Integer congue vitae enim eu ornare. Aenean sed tellus nec libero sagittis pharetra at id turpis. Sed egestas eu justo a feugiat. Duis molestie diam turpis, nec feugiat urna dapibus nec. Aliquam venenatis erat sit amet nulla porttitor, quis placerat enim bibendum. Pellentesque cursus porttitor magna id vehicula. Suspendisse mollis in urna ut feugiat. Duis leo tellus, malesuada et nisl at, egestas fringilla orci. Vivamus ultricies, lorem a porttitor lobortis, lacus augue bibendum dui, consequat sagittis lectus lorem ac risus. Mauris finibus nunc quis urna molestie blandit a a leo. In sed dictum massa. Vivamus eget sagittis dui. Quisque volutpat ex consequat tristique finibus. Pellentesque ultrices eget augue non ultricies.', likes: 50, comments: 10, shares: 22, user: 'MTC INC' },
    { id: 3, content: 'Integer et aliquam sapien. Curabitur ex metus, sollicitudin sed sagittis vel, bibendum sed purus. Phasellus pulvinar erat bibendum nisl ullamcorper, imperdiet cursus nibh ultrices. Nulla facilisi. Etiam iaculis imperdiet mi sed rutrum. Suspendisse pharetra mi a tincidunt fermentum. Nulla eu varius sem. Fusce orci eros, maximus id volutpat sit amet, convallis nec nunc. Mauris viverra, odio nec convallis rhoncus, lacus leo scelerisque libero, sit amet laoreet metus enim in enim. Vivamus sagittis tristique velit eget suscipit. Integer vulputate, lectus euismod interdum cursus, dui sem tempus sem, quis finibus nulla velit quis tortor. Proin ipsum mi, pellentesque viverra lacinia ut, dapibus sit amet velit. Quisque malesuada metus ac arcu feugiat, pulvinar blandit urna viverra. Etiam placerat, massa sed eleifend blandit, dolor metus suscipit ipsum, sed mattis turpis nulla id dui. Proin iaculis aliquam eleifend. Ut elit dolor, luctus at ipsum sed, fringilla tempor augue.', likes: 5, comments: 1, shares: 2, user: 'Anonymous' },
    { id: 4, content: 'Proin condimentum risus risus, ut tristique dui iaculis eget. Vivamus aliquam, tellus nec faucibus porttitor, elit turpis hendrerit elit, eu egestas enim arcu sit amet nisl. Quisque at ultrices augue. Suspendisse sed nulla auctor, varius nisl et, euismod nulla. Aenean euismod condimentum turpis, et cursus felis luctus eu. Ut finibus sem non egestas dignissim. Fusce mollis ac enim vitae laoreet. Etiam sollicitudin nec nibh sed dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc lacus nunc, pellentesque vitae lacinia non, vulputate non turpis.', likes: 5, comments: 6, shares: 8, user: 'Hacker' },
    { id: 5, content: 'Quisque tincidunt placerat velit sed ullamcorper. Vestibulum varius blandit ligula, in sodales urna hendrerit a. Ut suscipit ullamcorper varius. Nulla iaculis nulla quis leo faucibus, rutrum posuere lorem mollis. Curabitur porttitor commodo velit, nec pellentesque lacus aliquet eget. Cras bibendum massa orci. Curabitur a metus lorem. Quisque ut rutrum orci, ut elementum lectus. Sed cursus consequat dolor, et hendrerit leo scelerisque ac. Nullam vulputate elementum magna, sed faucibus libero. Aliquam ac enim mollis, sodales eros vel, gravida tortor. Morbi ligula ante, venenatis in velit non, iaculis accumsan augue. Proin id maximus velit.', likes: 5, comments: 0, shares: 0, user: 'Dev' },
    { id: 6, content: 'Nulla facilisi. Nam nec volutpat velit, eu placerat nisl. Praesent rutrum laoreet ultrices. Etiam tristique arcu eu ligula maximus, in ultrices lorem pulvinar. Curabitur id tortor nisl. Maecenas a placerat elit. Integer accumsan imperdiet ipsum nec fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur velit tortor, interdum eget fringilla porta, varius ut purus. Nunc pretium interdum ex in dapibus.', likes: 5000, comments: 100, shares: 220, user: 'UI/UX' },
  ]);

  const handleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleFollowToggle = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, isFollowing: !post.isFollowing } : post
    ));
  };

  return (
    
    <div className="min-h-screen bg-gray-100">

      <Navbar />
      
      <div className="flex flex-col items-center justify-center p-4">

        <div className="w-full max-w-4xl">

          {posts.map((post) => (

            <div key={post.id} className="bg-white p-6 rounded shadow-md mb-4">

              <div className="flex justify-between items-center mb-4">

                <Link to={`/home`} className="flex items-center">
                  <FaUserCircle className="text-3xl text-gray-600 mr-4" />
                  <h3 className="text-lg font-semibold">{post.user}</h3>
                </Link>

                <button
                  onClick={() => handleFollowToggle(post.id)}
                  className={`py-1 px-4 rounded-md ${post.isFollowing ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                >
                  {post.isFollowing ? 'Unfollow' : 'Follow'}
                </button>

              </div>

              <p className="text-gray-800 mb-4">{post.content}</p>
              
              <div className="flex justify-between items-center">

                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700"
                >
                  <FaThumbsUp className="mr-2" /> ({post.likes})
                </button>

                <button
                  className="flex items-center bg-gray-200 text-gray-800 py-1 px-4 rounded-md hover:bg-gray-300"
                >
                  <FaCommentAlt className="mr-2" /> ({post.comments})
                </button>
                
                <button
                  className="flex items-center bg-gray-200 text-gray-800 mr-3 py-1 px-4 rounded-md hover:bg-gray-300"
                >
                  <FaShare className="mr-2" /> ({post.shares})
                </button>
              
              </div>
            
            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default HomePage;