import React, { useState, FormEvent } from "react";
import {
  Segment,
  Form,
  FormInput,
  FormTextArea,
  Button,
} from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initializeFromState,
  createActivity,
  editActivity
}) => {
  const initializeFrom = () => {
    if (initializeFromState) {
      return initializeFromState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeFrom);

  const handleSubmit = () => {
      if (activity.id.length === 0){
        let newActivity = {
          ...activity,
          id: uuid()
        }
        createActivity(newActivity);
      } else {
        editActivity(activity);
      }
      
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <FormInput
          onChange={handleInputChange}
          placeholder="Title"
          value={activity.title}
          name="title"
        />
        <FormTextArea
          onChange={handleInputChange}
          rows={2}
          placeholder="Description"
          value={activity.description}
          name="description"
        />
        <FormInput
          onChange={handleInputChange}
          placeholder="Category"
          value={activity.category}
          name="category"
        />
        <FormInput
          onChange={handleInputChange}
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
          name="date"
        />
        <FormInput
          onChange={handleInputChange}
          placeholder="City"
          value={activity.city}
          name="city"
        />
        <FormInput
          onChange={handleInputChange}
          placeholder="Venue"
          value={activity.venue}
          name="venue"
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="submit"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
