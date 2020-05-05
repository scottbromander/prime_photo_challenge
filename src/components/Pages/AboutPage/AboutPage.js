import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div style={{ textAlign: 'center' }}>
      <h3>Rules</h3>
      <hr />
      <div style={{ textAlign: 'left', padding: '0 30px 30px 20px' }}>
        <ol>
          <li>
            Each team or individual will be given a list of items. You must find
            all items and snap a photo that includes your Prime Photo Challenge
            Card.
          </li>
          <li>
            Only one person per team needs to submit a picture for approval - if
            the picture is submitted, another team member may not load a picture
            for that specific challenge. Any photo not approved will have a
            reason provided by Prime Staff.
          </li>
          <li>If participating as a team, you should play together.</li>
          <li>
            Do not enter private property. If you need to ask a neighbor for an
            item or permission to take a picture, please do so. Stay safe
            throughout this challenge and do not put yourself or your team at
            risk to get a photo.
          </li>
          <li>
            Play fair and be kind. Remember it’s all in good fun and there is no
            need to ruin someone’s good time.
          </li>
          <li>
            All items must be photographed with the Prime Photo Challenge Card
            in view and then saved on the Prime Photo Challenge Site.
          </li>
          <li>
            Do not take a photo of two items together. They must be in separate
            pictures.
          </li>
          <li>
            All photos must be submitted by midnight CST on May 31st, 2020.
          </li>
          <li>
            All photos submitted will be reviewed by Prime staff for the
            following:
            <ul>
              <li>The Prime Photo Challenge Card is clear and visible,</li>
              <li>Accuracy of the item to the Challenge List.</li>
            </ul>
          </li>
          <li>
            Cheating, for any reason, in any way, will disqualify the entire
            team.
          </li>
          <li>
            As with everything, Prime’s Code of Conduct applies to all photos
            submitted. If you’re unsure if your photo could be offensive or
            inappropriate connect with Prime Staff before loading it to the
            site.
          </li>
        </ol>
      </div>
    </div>
  </div>
);

export default AboutPage;
