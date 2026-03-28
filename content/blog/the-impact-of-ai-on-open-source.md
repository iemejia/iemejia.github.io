---
title: "The Impact of AI on Open Source"
date: 2026-03-28T11:50:19+01:00
draft: true
tags: ["ai", "open-source", "software-engineering"]
categories: ["technology"]
description: "Reflections on how AI is reshaping open-source software — from lowering barriers for contributors to straining maintainers and challenging sustainability."
---

AI is transforming how we write software, and open source is at the center of that transformation. As someone who has contributed to and relied on open-source projects for over a decade, I find myself holding several opinions on this topic at once — some optimistic, some deeply concerned.

<!--more-->

## AI as a Force Multiplier for Contributors

The most visible benefit of AI in open source is that it lowers the barrier to entry. Tools like GitHub Copilot, Cursor, and open-source alternatives like Continue or Tabby help newcomers navigate unfamiliar codebases, understand conventions, and produce working patches faster than before.

This is genuinely positive. Open source has always had an onboarding problem. Large projects with years of history, complex build systems, and implicit conventions are intimidating. If AI can help a first-time contributor go from "I found a bug" to "here's a fix" in less time, that is a net gain for the ecosystem.

AI also helps with the less glamorous work — writing tests, updating documentation, migrating deprecated APIs — tasks that are important but rarely attract volunteers. In principle, this should free up experienced contributors to focus on design and architecture.

## The Quality Problem

But lower barriers come with a cost. Maintainers of popular projects are already reporting a rise in low-quality pull requests that appear to be AI-generated: superficial refactors, cosmetic changes dressed up as improvements, or patches that fix a symptom without understanding the underlying problem.

The issue is not that AI produces bad code — it often produces plausible-looking code. The issue is that plausible-looking code requires the same (or more) effort to review as code written by someone who understands the system. A maintainer still has to verify correctness, check edge cases, evaluate design trade-offs, and ensure the change fits the project's direction. When the contributor does not understand what they are submitting, that review becomes a one-sided conversation.

This is not a hypothetical concern. Projects like curl, the Linux kernel, and several Apache Software Foundation projects have already had to deal with waves of AI-assisted contributions where the submitter could not explain or defend their changes. Some projects have started adding policies around AI-generated contributions — not to ban them, but to set expectations about accountability.

## The Maintainer Burden

Open source already has a well-known sustainability problem: a small number of maintainers carry a disproportionate share of the work for software used by millions. AI is making this worse in a specific way.

More contributions means more review work. If the ratio of low-quality to high-quality submissions increases, the signal-to-noise ratio degrades, and maintainers spend more time triaging and less time building. This is the opposite of what AI was supposed to achieve.

The tools that help contributors write code have not been matched by tools that help maintainers review it. AI-assisted code review exists, but it is nowhere near the level where a maintainer can trust it to catch subtle bugs, architectural misalignments, or security issues. Until that gap closes, AI is effectively shifting costs from contributors to maintainers.

## The Sustainability Question

Perhaps the most consequential impact of AI on open source is economic. Large language models are trained on vast amounts of open-source code. The companies building and selling these models profit directly from that training data. The maintainers who wrote and maintained that code receive nothing in return.

This is not a new dynamic — companies have always built products on top of open-source software without contributing back. But AI amplifies the asymmetry. The value extraction is more direct (the code itself is the product, not just a dependency), and the scale is unprecedented.

Some argue that AI tools benefit open-source developers too, and that is true. But there is a difference between "developers use AI tools" and "the open-source ecosystem is sustainable." Individual developers getting productivity gains does not solve the funding, governance, and maintenance challenges that open source faces.

If anything, AI makes the sustainability conversation more urgent. If models trained on open-source code reduce the perceived need for human contributors (because "AI can just generate it"), funding and attention for open-source maintenance could decline further — even as the software itself becomes more critical than ever.

## What I Think We Should Do

I do not have a clean solution, but I think a few things would help:

1. **Set clear contribution policies.** Projects should define expectations for AI-assisted contributions — not banning them, but requiring that submitters understand, test, and can defend their changes.

2. **Invest in review tooling.** The AI ecosystem has focused heavily on code generation. We need equivalent investment in tools that help maintainers assess quality, detect regressions, and manage the increased volume of contributions.

3. **Address the training data question.** The industry needs a serious conversation about how AI companies compensate or contribute to the open-source projects they depend on. Voluntary donations are not sufficient; structural solutions are needed.

4. **Protect the human element.** Open source is not just a code production system. It is a community of people who learn, mentor, and collaborate. If AI reduces open source to a supply chain of generated patches, we lose something important.

## Final Thoughts

AI is neither saving nor destroying open source. It is accelerating trends that were already present — more contributions, more strain on maintainers, more value extraction without reciprocity — while adding new dynamics that we are only beginning to understand.

The open-source community has navigated disruptive shifts before: the rise of GitHub, the cloud, corporate open source, supply chain security. AI is the next one. How well we navigate it depends on whether we treat it as just a productivity tool or engage with the deeper questions it raises about sustainability, governance, and the future of collaborative software development.
