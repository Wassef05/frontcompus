import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./courses.css";
import { getAllCours } from '../../actions/cours.actions';

const CoursesCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coursList = useSelector((state) => state.cours.cours);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(getAllCours());
  }, [dispatch]);

  useEffect(() => {
    setDisplayedCourses(coursList.slice(0, 6));
  }, [coursList]);

  const handleShowMore = (id) => {
    navigate(`/course/${id}`);
  };

  const handleShowMoreCourses = () => {
    setShowAll(true);
    setDisplayedCourses(coursList);
  };

  const handleFilterChange = (category) => {
    setFilter(category);
    const filteredCourses = category === 'All'
      ? coursList
      : coursList.filter(course => course.category === category);
    setDisplayedCourses(filteredCourses.slice(0, showAll ? filteredCourses.length : 6));
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const categories = ['All', 'Web Development', 'Marketing', 'Design', 'UML', 'Python'];

  return (
    <section className='coursesCard'>
      <div className='container'>
        <div className='filter-container'>
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => handleFilterChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className='grid2'>
          {displayedCourses.map((val) => (
            <div className='items' key={val._id}>
              <div className='content flex'>
                <div className='left'>
                  <div className='img'>
                    <img src={"http://localhost:8080/" + val?.image} alt='' />
                  </div>
                </div>
                <div className='text'>
                  <h1>{val?.title}</h1>
                  <p>{truncateText(val?.description, 100)}</p>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <label htmlFor=''>(5.0)</label>
                  </div>
                </div>
              </div>
              <div className='price'>
                <h3>
                  {val.priceAll} /Price 0 TND {val.pricePer}
                </h3>
              </div>
              <button className='outline-btn' onClick={() => handleShowMore(val._id)}>Show more !</button>
            </div>
          ))}
        </div>
        {!showAll && coursList.length > 6 && (
          <button className='show-more-btn' onClick={handleShowMoreCourses}>Show More</button>
        )}
      </div>
    </section>
  );
};

export default CoursesCard;
