---
title: "Using AI to Improve Apache Parquet Performance"
date: 2026-04-26T00:00:00+02:00
draft: true
tags: ["ai", "apache-parquet", "performance", "benchmarking", "jmh"]
categories: ["technology"]
description: "How AI can help explore, benchmark, and improve Apache Parquet performance using JMH-driven experiments."
---

Performance work in mature open-source projects is rarely about guessing where the bottleneck is. It is about building enough evidence to separate real improvements from noise. Lately, I have been thinking about how AI can help with that process in Apache Parquet: not by replacing careful engineering judgment, but by accelerating the loop between hypothesis, benchmark, implementation, and review.

<!--more-->

## The Problem with Performance Work

Apache Parquet is used in many data systems where small improvements can matter at large scale. A faster encoding path, a more efficient decoding loop, or fewer allocations in a hot path can become meaningful when repeated across billions of values.

But performance work is also easy to get wrong. A change that looks faster in a micro-test may not survive a proper benchmark. A benchmark that is too synthetic may optimize the wrong thing. A local improvement may increase memory pressure, regress another encoding, or make the code harder to maintain.

That is why I find JMH useful. It forces a more disciplined conversation: what are we measuring, under which conditions, with which inputs, and against which baseline?

## Where AI Can Help

AI is not a benchmark. It does not know whether a patch is actually faster. But it can help produce better experiments faster.

For example, AI can help with:

- identifying likely hot paths from code structure and profiling output
- generating candidate JMH benchmarks for specific read/write paths
- suggesting input distributions that exercise edge cases
- explaining unfamiliar parts of the Parquet codebase
- proposing alternative implementations for comparison
- summarizing benchmark results and highlighting suspicious variance

The important point is that AI should remain inside the evidence loop. Every suggestion needs to be tested, measured, and reviewed like any other performance hypothesis.

## A JMH-Driven Workflow

The workflow I want to explore looks roughly like this:

1. Pick a narrow area of Parquet, such as dictionary encoding, plain decoding, level reading, or byte-buffer handling.
2. Use profiling, existing issues, or code inspection to form a specific hypothesis.
3. Ask AI to help draft a JMH benchmark that isolates the behavior.
4. Review the benchmark manually to ensure it measures the intended thing.
5. Run the benchmark against the baseline and record the result.
6. Use AI to propose implementation alternatives.
7. Benchmark every candidate and reject anything that does not clearly improve the measured behavior.
8. Validate that the change does not regress broader workloads or readability.

This keeps AI useful without letting it become the source of truth.

## What a Good Benchmark Should Capture

A useful JMH benchmark for Parquet should be boring in the best possible way. It should make the measured operation explicit, avoid hidden setup costs, and use inputs that resemble real data patterns.

Some questions I would ask before trusting a benchmark:

- Does it separate setup from the measured operation?
- Does it avoid dead-code elimination?
- Does it include warmup and enough forks?
- Does it cover realistic data distributions?
- Does it measure allocations as well as throughput?
- Does it compare against a clear baseline?
- Is the benchmark small enough that reviewers can understand it?

AI can help generate the first draft, but these questions still need a human answer.

## The Risk of AI-Generated Optimizations

The biggest risk is plausible nonsense. AI can confidently suggest a faster-looking implementation that changes semantics, optimizes for the benchmark rather than the library, or ignores edge cases that matter in columnar formats.

In a project like Apache Parquet, correctness comes first. Performance changes need to preserve compatibility, respect the format, and remain maintainable. A clever micro-optimization is not useful if future contributors cannot understand it or if it only helps a narrow synthetic case.

## What I Want to Try Next

I want to start with a small benchmark suite around a focused Parquet hot path and use AI as an assistant for generating benchmark variants and implementation hypotheses. The goal is not to prove that AI can magically optimize Parquet. The goal is to see whether AI can make the performance engineering loop faster while keeping the same standard of evidence.

If the benchmarks show clear results, the next step would be to turn the experiment into a concrete contribution: benchmark first, implementation second, and a pull request that explains both the performance data and the trade-offs.
