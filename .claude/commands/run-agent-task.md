---
argument-hint: [agent] [task] [prompt]
description: Activates the {agent} and runs the {task} with the given {prompt} as input to the task.
---
# purpose

The purpose of this command is to activate the {agent} and run the {task} with the given {prompt} as input to the task.

# Workflow

## Step 1

Read the agent definition file and assume the persona of the agent:
 `@.bmad/bmm/agents/{agent}.md`

## Step 2

Run the given {task} with the given {prompt} as input to the task.

## Step 3

Report completion to the user