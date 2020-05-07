import React from 'react'
import { Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function BackButton() {
    const history = useHistory();

    const handleBack = (e) => {
        e.preventDefault();
        history.goBack()
    }

    return (
        <div>
            <a
                className="back-link"
                onClick={handleBack}
                title="Go back"
            >
                <Icon link size='large' name='arrow alternate circle left outline' />
            </a>
        </div>
    )
}
