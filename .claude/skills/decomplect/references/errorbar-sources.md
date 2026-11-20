# Error Bar sources

Links to the sources behind `errorbar-principles.md`. The principles are our own summaries with
short quotes for citation; no full texts are reproduced here. Read or watch the originals.

## Tyson (Part A)

| Id used in principles | Source | Date | Link |
|---|---|---|---|
| Perimeter of Ignorance | Tyson, Natural History essay | 2005 | https://neildegrassetyson.com/?p=293 |
| Fear of Numbers | Tyson, Natural History essay | — | https://neildegrassetyson.com/?p=269 |
| Certain Uncertainties I | Tyson, Natural History essay | ≥1998 | https://neildegrassetyson.com/?p=256 |
| Certain Uncertainties II | Tyson, Natural History essay ("Belly Up to the Error Bar") | ≥1998 | https://neildegrassetyson.com/?p=257 |
| The Beginning of Science | Tyson, Natural History essay | — | https://neildegrassetyson.com/?p=264 |
| By the Numbers | Space Chronicles excerpt (2008 keynote) | 2012 | https://www.nhmag.com/print/2148 |
| Ferriss #389 | The Tim Ferriss Show | 2019-10 | https://tim.blog/2019/10/15/neil-degrasse-tyson-transcript/ |
| Harbinger #327 | The Jordan Harbinger Show | — | https://jordanharbinger.com/327 |
| Freakonomics 2024 | People I (Mostly) Admire #145 | 2024-11-22 | https://freakonomics.com/podcast/neil-degrasse-tyson-is-still-starstruck |
| StarTalk 2017 | Science Literacy in the Misinformation Age | 2017-05-19 | https://startalkmedia.com/show/science-literacy-misinformation-age-lmasa/ |
| Big Think | How science literacy can save us from the internet | — | https://bigthink.com/the-present/disinformation/ |

## Gregg (quotes cited as "Gregg, <id>"; mostly Part B, also E1, E2, E4, E5, E7)

| Id used in principles | Source | Date | Link |
|---|---|---|---|
| Methodology | Performance Analysis Methodology (web page) | updated 2025-01-23 | https://www.brendangregg.com/methodology.html |
| USE | The USE Method (web page) | updated 2017-08-24 | https://www.brendangregg.com/usemethod.html |
| Queue 2012 | "Thinking Methodically about Performance", ACM Queue 10(12); reprinted CACM Feb 2013 | 2012 | https://queue.acm.org/detail.cfm?id=2413037 |
| Flame Graph 2016 | "The Flame Graph", ACM Queue 14(2) | 2016 | https://queue.acm.org/detail.cfm?id=2927301 |
| Active Benchmarking | Active Benchmarking (web page) | updated 2014-04-20 | https://www.brendangregg.com/activebenchmarking.html |
| Velocity 2013 | "Stop the Guessing" talk slides | 2013-06-19 | https://www.brendangregg.com/Slides/VelocityStopTheGuessing2013 |
| Applicative 2016 | "System Methodology" talk slides, ACM Applicative | 2016-06 | https://www.brendangregg.com/Slides/ACMApplicative2016_SystemMethodology |

## Dean (quotes cited as "Dean, <id>" or by paper name; Part C)

| Id used in principles | Source | Date | Link |
|---|---|---|---|
| LADIS 2009 | Dean, "Designs, Lessons and Advice from Building Large Distributed Systems" (keynote slides) | 2009 | https://www.cs.cornell.edu/projects/ladis2009/talks/dean-keynote-ladis2009.pdf |
| Stanford 2010 | Dean, "Building Software Systems at Google and Lessons Learned" (Stanford EE380 slides) | 2010-11 | https://static.googleusercontent.com/media/research.google.com/en//people/jeff/Stanford-DL-Nov-2010.pdf |
| WSDM 2009 | Dean, "Challenges in Building Large-Scale Information Retrieval Systems" (keynote slides) | 2009 | https://static.googleusercontent.com/media/research.google.com/en//people/jeff/WSDM09-keynote.pdf |
| Perf Hints | Dean & Ghemawat, "Performance Hints" | 2023, updated 2025-12 | https://abseil.io/fast/hints.html |
| Tail at Scale 2013 | Dean & Barroso, "The Tail at Scale", CACM 56(2) | 2013-02 | https://cacm.acm.org/research/the-tail-at-scale/ |
| MapReduce 2004 | Dean & Ghemawat, "MapReduce: Simplified Data Processing on Large Clusters", OSDI | 2004 | https://research.google.com/archive/mapreduce-osdi04.pdf |
| Bigtable 2006 | Chang, Dean, Ghemawat et al., "Bigtable: A Distributed Storage System for Structured Data", OSDI | 2006 | https://research.google.com/archive/bigtable-osdi06.pdf |

Not used as a source: the popular "Latency numbers every programmer should know" gist
(github.com/jboner/2841832). It is a third-party compilation of Dean's table and has since added rows
(SSD, 2026 LLM timings) that are not Dean's. Cite the slides or Perf Hints instead.

## Further reading not used directly
- Tyson (paid): Starry Messenger (2022), Death by Black Hole (2007), Letters from an Astrophysicist (2019).
- Gregg (free): LISA 2012 methodologies slides (https://www.brendangregg.com/Slides/LISA2012_methodologies.pdf), Linux Performance (https://www.brendangregg.com/linuxperf.html), Off-CPU Analysis (https://www.brendangregg.com/offcpuanalysis.html), TSA method (https://www.brendangregg.com/tsamethod.html), "Linux Performance Analysis in 60,000 Milliseconds" (Netflix tech blog, 2015).
- Dean (free): the video recordings of the talks above (no official transcripts found); Spanner (OSDI 2012).
- Gregg (paid): Systems Performance 2nd ed. (2020), BPF Performance Tools (2019).

## Ideas borrowed from other agent skills

Three steps of the mode were inspired by skills in four public repositories; no text from them is reproduced here.
- A rival explanation and a High/Medium/Low confidence for every claimed cause (E7): `confidence-honesty`
  in [ntcoding/claude-skillz](https://github.com/ntcoding/claude-skillz) and `fact-checker` in
  [NickCrew/Claude-Cortex](https://github.com/NickCrew/Claude-Cortex).
- Checking an estimate by a second route, and stopping when the decision holds across the range
  (E15): `estimation-fermi` in [lyndonkl/claude](https://github.com/lyndonkl/claude).
- Confirming a fix with the same measurement before and after (E22):
  [thecsdoctor/brendangregg-use-tsa-skill](https://github.com/thecsdoctor/brendangregg-use-tsa-skill) (MIT).
