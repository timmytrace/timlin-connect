---
title: Prompt Injection, Explained for Security Teams
excerpt: A practical primer on direct and indirect prompt injection: how the attacks work, why they bypass conventional controls, and the layered defenses that actually help.
category: AI Security
date: 2026-07-10
author: Timlin Connect Team
authorRole: AI Security Research
image: /magnumai-demo/blocked-requests.png
takeaways:
  - Direct injection abuses the input box; indirect injection abuses your retrieval pipeline.
  - "Normalization first: attackers hide payloads in encodings, split tokens, and invisible characters."
  - Untrusted content must never be able to trigger an agent tool call without a human in the loop.
---

Prompt injection is best understood as social engineering against a machine. Instead of tricking an employee into wiring money, the attacker tricks a model into ignoring its instructions, revealing its system prompt, or taking an action its operators never intended.

Direct injection happens in the user-facing input: "ignore all previous instructions", role-play jailbreaks, token smuggling through encodings, or invisible Unicode characters that hide instructions from human reviewers while remaining perfectly legible to the model.

Indirect injection is subtler and more dangerous. The attacker plants instructions in content the application will later retrieve: a webpage the model summarizes, a resume it screens, an email it triages. The application delivers the payload to itself.

No single control stops this. Effective defense stacks several layers: evasion-resistant normalization before scanning, pattern and heuristic detection, semantic classification, and for high-stakes decisions an LLM judge that adjudicates uncertain cases. Retrieved content should carry a trust level, and nothing untrusted should ever be able to trigger a tool call on its own.

Finally, treat detections as telemetry, not just blocks. The prompts your gateway flags are free threat intelligence about who is probing your application and how.
