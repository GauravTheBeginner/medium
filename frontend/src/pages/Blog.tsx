import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import FullBlog from "../components/FullBlog";
import Spinner from "../components/Spinner";

interface Blog {
  title: string;
  content: string;
  id: string;
  author: {
    name: string;
  };
}

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | undefined>(undefined); // Define initial state as undefined
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(response.data);
        setBlog(response.data.blog );
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch blog. Please try again.");
        setLoading(false); // Set loading to false even in case of error
      }
    };
    getBlog();
  }, [id]);

  if (loading || !blog) {
    return <Spinner/>;
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }


  return (
    <div>
      { blog && <FullBlog blog={blog} />}
    </div>
  );
}

export default Blog;
