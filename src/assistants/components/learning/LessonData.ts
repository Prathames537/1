
import { Lesson } from './LessonContent';

// Sample lesson data for Module 3: Patient sensitivity and privacy
export const patientPrivacyLessons: Lesson[] = [
  {
    id: "3-1",
    title: "Introduction to Patient Privacy",
    duration: "10 mins",
    sections: [
      {
        type: "text",
        title: "Introduction to Patient Privacy",
        content: `
          <h3>Why Patient Privacy Matters</h3>
          <p>
            As a home healthcare provider, you play a critical role in maintaining patient privacy and confidentiality.
            This module will introduce you to the fundamental principles of patient privacy and why it's essential in 
            providing quality care.
          </p>
          <p>
            Patient privacy is not just a legal requirement but a cornerstone of building trust with your patients. When 
            patients trust that their personal information is protected, they're more likely to:
          </p>
          <ul>
            <li>Share complete and accurate information about their health</li>
            <li>Follow treatment recommendations</li>
            <li>Maintain an ongoing relationship with healthcare providers</li>
          </ul>
          <p>
            Throughout this module, you'll learn about HIPAA regulations, best practices for maintaining confidentiality
            during home visits, and how to handle sensitive situations with professionalism.
          </p>
        `
      },
      {
        type: "video",
        title: "Understanding HIPAA Regulations",
        content: `
          <h3>Key HIPAA Requirements for Home Healthcare Workers</h3>
          <p>
            This video covers the essential aspects of HIPAA (Health Insurance Portability and Accountability Act) 
            that you need to know as a Welli healthcare provider. 
          </p>
          <p>
            Pay close attention to:
          </p>
          <ul>
            <li>What constitutes Protected Health Information (PHI)</li>
            <li>When and how you can share PHI</li>
            <li>Documentation requirements</li>
            <li>Patient rights under HIPAA</li>
          </ul>
        `,
        videoUrl: "https://example.com/hipaa-video"
      },
      {
        type: "quiz",
        title: "HIPAA Basics Quiz",
        content: `
          <p>Test your understanding of HIPAA regulations with this quick quiz. Select the best answer for each question.</p>
        `,
        quiz: [
          {
            question: "Which of the following is considered Protected Health Information (PHI)?",
            options: [
              "A patient's name only",
              "Patient's medical record number only",
              "Patient's blood type only",
              "Any information that could identify a patient combined with health information"
            ],
            correctAnswer: 3
          },
          {
            question: "When can you share a patient's health information with family members?",
            options: [
              "Anytime - family members have a right to know",
              "Only when the patient has given permission or it's in their best interest during an emergency",
              "Only with immediate family members like parents or children",
              "Never - all health information is completely confidential"
            ],
            correctAnswer: 1
          },
          {
            question: "What should you do if you accidentally disclose PHI to an unauthorized person?",
            options: [
              "Ignore it if it seems minor",
              "Ask the unauthorized person to keep it confidential",
              "Report it immediately as a potential breach",
              "Wait to see if the patient finds out"
            ],
            correctAnswer: 2
          }
        ]
      }
    ]
  },
  
  {
    id: "3-2",
    title: "Privacy in Home Healthcare Settings",
    duration: "15 mins",
    sections: [
      {
        type: "text",
        title: "Unique Privacy Challenges in Home Settings",
        content: `
          <h3>Privacy Challenges During Home Visits</h3>
          <p>
            Providing healthcare in a patient's home presents unique privacy challenges compared to traditional healthcare settings.
            In hospitals or clinics, the environment is designed to protect patient privacy, but homes are not.
          </p>
          <p>
            Some key challenges you may encounter include:
          </p>
          <ul>
            <li>Family members or visitors being present during care</li>
            <li>Shared living environments where others may overhear conversations</li>
            <li>Neighbors who may observe your visits</li>
            <li>Phone calls that may need to be taken in the patient's presence</li>
            <li>Documenting care while in the home</li>
          </ul>
          <p>
            This lesson will help you navigate these challenges while maintaining professional standards and legal compliance.
          </p>
        `
      },
      {
        type: "video",
        title: "Best Practices for Privacy During Home Visits",
        content: `
          <h3>Maintaining Privacy in the Patient's Home</h3>
          <p>
            This video demonstrates practical techniques for maintaining privacy during home visits. Watch for examples of:
          </p>
          <ul>
            <li>Setting up a private space for sensitive discussions</li>
            <li>Managing family member presence appropriately</li>
            <li>Discreet handling of medications and medical equipment</li>
            <li>Proper documentation practices</li>
            <li>Responding to privacy challenges that might arise</li>
          </ul>
        `,
        videoUrl: "https://example.com/home-privacy-video"
      },
      {
        type: "quiz",
        title: "Home Privacy Scenarios Quiz",
        content: `
          <p>Review these common scenarios and select the most appropriate response for each situation.</p>
        `,
        quiz: [
          {
            question: "You arrive at a patient's home and find several family members present. The patient needs to discuss sensitive test results. What should you do?",
            options: [
              "Suggest discussing the results later when the patient is alone",
              "Ask the family members to leave the room",
              "Ask the patient if they would like privacy for the discussion",
              "Proceed with the discussion regardless of who is present"
            ],
            correctAnswer: 2
          },
          {
            question: "You need to document information on your tablet during a home visit. What's the best practice?",
            options: [
              "Position your screen so the patient and others cannot see what you're typing",
              "Ask the patient to leave the room while you document",
              "Use privacy screen protectors and position yourself where only you can see the screen",
              "Don't document until you leave the home"
            ],
            correctAnswer: 2
          },
          {
            question: "A neighbor approaches you in the driveway and asks about the patient's condition. How should you respond?",
            options: [
              "Give general information but no specific details",
              "Politely explain that you cannot discuss any information about your visit",
              "Acknowledge you're there for a healthcare visit but provide no other details",
              "Share basic information if the neighbor seems concerned"
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  
  {
    id: "3-3",
    title: "Handling Sensitive Information",
    duration: "20 mins",
    sections: [
      {
        type: "text",
        title: "Types of Sensitive Information",
        content: `
          <h3>Categories of Especially Sensitive Health Information</h3>
          <p>
            While all health information requires privacy protection, certain types of information are considered 
            particularly sensitive and may have additional legal protections or require special handling.
          </p>
          <p>
            These categories typically include:
          </p>
          <ul>
            <li>Mental health information</li>
            <li>Substance use disorder information</li>
            <li>HIV/AIDS status and test results</li>
            <li>Genetic testing information</li>
            <li>Sexual health information</li>
            <li>Domestic violence documentation</li>
          </ul>
          <p>
            Understanding how to appropriately handle these types of information is essential for providing 
            compassionate care while maintaining legal compliance.
          </p>
        `
      },
      {
        type: "video",
        title: "Communication Best Practices",
        content: `
          <h3>Communicating About Sensitive Topics</h3>
          <p>
            This video covers techniques for discussing sensitive health topics with patients in their homes. 
            You'll learn how to:
          </p>
          <ul>
            <li>Create a private, comfortable environment for sensitive conversations</li>
            <li>Use neutral, non-judgmental language</li>
            <li>Recognize and respond to patient discomfort</li>
            <li>Document sensitive information appropriately</li>
            <li>Handle unexpected interruptions during sensitive discussions</li>
          </ul>
        `,
        videoUrl: "https://example.com/sensitive-communication-video"
      },
      {
        type: "quiz",
        title: "Sensitive Information Handling Quiz",
        content: `
          <p>Test your understanding of how to handle sensitive patient information with this quiz.</p>
        `,
        quiz: [
          {
            question: "A patient shares information about their mental health medication during your visit. This information should be:",
            options: [
              "Recorded only in general terms in your notes",
              "Documented according to standard protocols, with the same privacy protections as other health information",
              "Kept separate from their main health record",
              "Verbally reported to your supervisor but not documented"
            ],
            correctAnswer: 1
          },
          {
            question: "You notice signs of possible substance abuse during a home visit. What's the appropriate way to document this?",
            options: [
              "Document objective observations only, using non-judgmental language",
              "Use euphemisms or code words in your documentation",
              "Wait until you have definitive proof before documenting anything",
              "Document your suspicions clearly to alert other providers"
            ],
            correctAnswer: 0
          },
          {
            question: "A patient asks you not to record information about their HIV status in their medical record. How should you respond?",
            options: [
              "Agree to keep it off the record as patient trust is most important",
              "Explain that you must document it but will ensure it's protected according to privacy laws",
              "Tell them you'll check with your supervisor before documenting",
              "Suggest they speak with another provider about this concern"
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  
  {
    id: "3-4",
    title: "Privacy Breach Prevention and Response",
    duration: "10 mins",
    sections: [
      {
        type: "text",
        title: "Common Privacy Breaches",
        content: `
          <h3>Understanding and Preventing Privacy Breaches</h3>
          <p>
            Privacy breaches can occur even with the best intentions. Being aware of common scenarios can help you
            prevent them from happening during your home healthcare visits.
          </p>
          <p>
            Common privacy breaches in home healthcare include:
          </p>
          <ul>
            <li>Leaving documents or devices with patient information visible</li>
            <li>Discussing patient information where others might overhear</li>
            <li>Lost or stolen devices containing patient information</li>
            <li>Sending patient information to incorrect recipients</li>
            <li>Improper disposal of documents with patient information</li>
            <li>Sharing photos that may contain patient information (even accidentally)</li>
          </ul>
          <p>
            This section will help you identify potential breach situations and take steps to prevent them.
          </p>
        `
      },
      {
        type: "text",
        title: "Response Protocol",
        content: `
          <h3>What To Do If a Privacy Breach Occurs</h3>
          <p>
            Despite our best efforts, privacy incidents can occur. Knowing how to respond appropriately is essential
            for maintaining patient trust and legal compliance.
          </p>
          <p>
            If you believe a privacy breach has occurred:
          </p>
          <ol>
            <li><strong>Act immediately</strong> - Don't wait to report the incident</li>
            <li><strong>Document what happened</strong> - Record the details while they're fresh in your mind</li>
            <li><strong>Report to your supervisor</strong> - Follow Welli's incident reporting procedure</li>
            <li><strong>Be honest with the patient</strong> - If appropriate, explain what happened and steps being taken</li>
            <li><strong>Cooperate with the investigation</strong> - Provide all requested information</li>
            <li><strong>Learn from the incident</strong> - Identify how to prevent similar occurrences</li>
          </ol>
          <p>
            Remember: Prompt reporting of privacy incidents is required by law and helps minimize potential harm.
          </p>
        `
      },
      {
        type: "quiz",
        title: "Privacy Breach Quiz",
        content: `
          <p>Test your understanding of privacy breach prevention and response with this quiz.</p>
        `,
        quiz: [
          {
            question: "Which of the following would NOT be considered a privacy breach?",
            options: [
              "Discussing a patient's condition with another healthcare provider involved in their care",
              "Accidentally leaving patient papers visible when other family members enter the room",
              "Using a patient's first name when greeting them at their door",
              "Posting about your day on social media, mentioning the types of cases you saw"
            ],
            correctAnswer: 0
          },
          {
            question: "You realize you left your tablet with patient information in a patient's home after leaving. What should you do first?",
            options: [
              "Wait until tomorrow's scheduled visit to retrieve it",
              "Call your supervisor immediately to report the potential breach",
              "Call the patient and ask them to secure the tablet until you return",
              "Do nothing since the information is password protected"
            ],
            correctAnswer: 1
          },
          {
            question: "How quickly should a privacy breach be reported within the Welli system?",
            options: [
              "Within 24 hours",
              "Immediately upon discovery",
              "Within one week",
              "By the end of your shift"
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  }
];
