import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import './styles.scss';
import cn from 'classnames'
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';

interface EditableFieldProps {
  initialValue: string | null | undefined;
  updateField: (field: string,) => void;
  inputStyle: string | null;
  inputType: string | null;
  isAddField?: boolean | null;
  setIsAddNewField?: (value: boolean ) => void;
  showInputStyleName?: boolean | null;
  placeholder?: string | null;
}

const EditableField : React.FC<EditableFieldProps> = ({initialValue, updateField, inputStyle, inputType, isAddField, setIsAddNewField, showInputStyleName: showInputStyleName=true, placeholder=''  }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [value, setValue] = useState(initialValue || "");
  const [isHoverField, setIsHoverField] = useState<Boolean>(false)

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);

  useEffect (() => {
    if (value === "") {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }, [value])

  useEffect (() => {
    if(isAddField) { 
      setValue("");
    }
  }, [isAddField])

  useEffect (() => {
    if(!isEditing && initialValue !== value) { 
      updateField(value)
    }
  }, [isEditing])

  
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target?.value;
    setValue(value);
    if(setIsAddNewField){
      setIsAddNewField(false);
    }
  }; 


  const toggleMouseEnterField = () => {
    setIsHoverField(true);
  };

  const toggleMouseLeaveField = () => {
    setIsHoverField(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && inputStyle === 'Ingredient') {  
      event.preventDefault();
      setIsEditing(false);
      //setIsHoverField(false);
    }
  }

  return ( 
    <>
      <div className={cn('editableField',{[`${inputStyle}`]: inputStyle}, {'isEmpty': isEmpty})} onMouseEnter={() => toggleMouseEnterField()} onMouseLeave={() => toggleMouseLeaveField()}>
        <textarea
          id='editableField'
          value={value}
          onChange={e => handleChange(e)}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          ref={textAreaRef}
          placeholder={''+placeholder}
          rows={1}
          onKeyDown={(e) => handleKeyDown(e)}
          />
          {showInputStyleName && (
            <p className={cn('inputStyleName', {'showInputStyleName' : isHoverField || isEditing})}>{inputType}</p>
          )}
      </div>
    </>
  );
};

export default EditableField;
