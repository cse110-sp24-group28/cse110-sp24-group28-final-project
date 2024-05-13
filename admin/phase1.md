# CI/CD Platform Phase 1

In this current version of the pipeline, our team wishes to maintain certain standards of the code that is pushed or pulled by our fellow team members. 

These include:

1. Format
2. Consistency
3. Code Style
4. Testing
5. Human Verification of Code


 ## Format

 Our team had decided to use the Prettier format because it is an extension availible on VSCode for everyone and ensures a great, easy to use and consistent format for everyone on the team.
 We implemented this in our pipeline itself by running a format-check to make sure everyone's code is formatted in the same way to maintain readibility and ease of use. This check will run whenever 
 a team member pulls or pushes a piece of code in order for everyone to have the same type of code whenever they use it.

 ## Maintainability

 Our team wanted to make sure that everyone was using the same dependencies when working on the product. Thus we added a check in the pipeline to ensure that everyone had the same dependencies downloaded and that nothing 
 had changed. This was done to ensure there would be no incompatibility or inconsistency with the code between team members and that everyone was working with the same version of the program.

 ## Code Style

 Our team wanted to make sure that the code we create is readable by everyone, thus we decided to add linting to our pipeline to make sure that the code style of whatever new piece or exisiting 
 piece of code in the software was consistent and readable by everyone on the team.

 ## Testing

 Our team wanted to make sure that any new feature did not break the software and could safely integrate with it rather than break it. Thus we added another key functionality to the pipeline
 which is the testing job which runs all of the E2E testing for the product whenever it is pushed or pulled. To ensure that all existing code works as supposed to and that any new code added to it also works with
 without adding any new bugs to it. This job would also run all of the unit tests present in the application. We will be using Jest to run all of these tests.

 ## Human Verification of Code

 Whenever any team member wishes to merge a piece of code into the master branch, a key part of the pipeline is the peer review of the code. In order for the code to be merged into the product, it must be checked and given 
 the seal of approval by another team member before it can be merged. This is to ensure that another person has checked the code and that the team is okay with this code being merged into the master branch after passing 
 all of the necessary tests. 

 We have implemented all of these features into our CI/CD pipeline. 

 Here is a diagram that shows how we implemented the above features in the pipeline. 

 ![Phase 1 pipeline Diagram](./phase1.png)

 ## Future Considerations 

 In the future, we wish to integrate an automated code quality tool like Codacy that can check the quality of our code and functions and reduce the workload on our team members for checking and verifying the code via Pull Requests and Peer Reviews. 
 We would also want to implement a documentation generation feature in our pipeline in order to reduce the work needed to document everything that we have decided and built into our software.
 
