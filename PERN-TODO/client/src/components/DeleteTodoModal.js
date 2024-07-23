import React, { Fragment } from 'react';

const DeleteTodoModal = ({ todo, deleteTodo }) => {

    const confirmDelete = async () => {
        try {
          await deleteTodo(todo.todo_id);
          closeModal();
        } catch (error) {
          console.error('Failed to delete todo:', error);
        }
      };

      const closeModal = () => {
        const modal = document.getElementById(`deleteModal${todo.todo_id}`);
        if (modal) {
          window.$(modal).modal('hide'); 
          window.$('.modal-backdrop').remove(); 
        }
      };

  return (
    <Fragment>
      <button type="button" className="btn btn-danger" data-toggle="modal" data-target={`#deleteModal${todo.todo_id}`}>
        Delete
      </button>

      <div className="modal fade" id={`deleteModal${todo.todo_id}`} tabIndex="-1" role="dialog" aria-labelledby={`deleteModalLabel${todo.todo_id}`} aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`deleteModalLabel${todo.todo_id}`}>Confirm Delete</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete "{todo.description}"?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DeleteTodoModal;
