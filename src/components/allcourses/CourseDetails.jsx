import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import './courseDetails.css';
import { getCommentaireByCour, addcommentaire } from '../../actions/commentaire.actions';

const CourseDetails = () => {
  const { id } = useParams();
  const coursList = useSelector((state) => state.cours.cours);
  const course = coursList.find((cours) => cours._id === id);
  const dispatch = useDispatch();
  const [commentaires, setCommentaires] = useState([]);
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    dispatch(getCommentaireByCour(id));
  }, [dispatch, id]);

  const commentairesListe = useSelector((state) => state.commentaires.commentaires);

  useEffect(() => {
    setCommentaires(commentairesListe);
  }, [commentairesListe]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addcommentaire({ content: newComment, cour: id }));
      setNewComment('');
    }
  };

  if (!course) {
    return <div>Cours non trouvé</div>;
  }

  const isVideo = (file) => {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const fileExtension = file.url.split('.').pop();
    return videoExtensions.includes(fileExtension);
  };

  return (
    <div className="course-details">
      <div className="course-content">
        <div className="media-section">
          {course.file && (
            <div className="course-file">
              {isVideo(course.file) ? (
                <video controls width="100%">
                  <source src={"http://localhost:8080/" + course.file.url} type={`video/${course.file.url.split('.').pop()}`} />
                  Votre navigateur ne supporte pas la balise vidéo.
                </video>
              ) : (
                <a href={"http://localhost:8080/" + course.file.url} target="_blank" rel="noopener noreferrer">
                  Voir le fichier
                </a>
              )}
            </div>
          )}
          {course.image && (
            <div className="course-image">
              <img src={"http://localhost:8080/" + course.image} alt={course.title} />
            </div>
          )}
        </div>
        <div className="text-section">
          <div className="course-details-header">
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <Button variant="outlined" onClick={handleOpen}>
              Voir les commentaires
            </Button>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <Typography variant="h6" component="h2">
            Commentaires
          </Typography>
          <div className='comments-section'>
            {commentaires.map((val) => (
              <div className='comment-item' key={val._id}>
                <h3>{val?.sender?.username}</h3>
                <p>{val?.content}</p>
              </div>
            ))}
          </div>
          <TextField
            label="Ajouter un commentaire"
            multiline
            rows={4}
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleAddComment}>
            Ajouter
          </Button>
        </Box>
      </Modal>

      <Button className='btnn1' variant="contained" color="primary" onClick={() => window.history.back()}>
        Retour
      </Button>
    </div>
  );
};

export default CourseDetails;
