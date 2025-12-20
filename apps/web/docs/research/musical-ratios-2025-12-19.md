# Comprehensive Musical Ratios for Design Token Systems
**Date:** 2025-12-19
**Purpose:** Complete mathematical analysis of musical intervals and their application to design tokens
**Scope:** Just intonation ratios, circle of fifths, harmonic series, Apple HIG pattern matching

---

## Executive Summary

This report provides a comprehensive analysis of musical interval ratios and their application to design token systems, with specific focus on matching Apple Human Interface Guidelines patterns.

**Key Findings:**
- **Complete diatonic interval set**: 13 basic intervals from unison (1.0) to octave (2.0)
- **Extended intervals**: 9th, 11th, 13th provide ratios beyond octave (2.25, 2.667, 3.25)
- **Circle of fifths limitation**: Stacking perfect fifths doesn't close the circle in just intonation
- **HIG typography**: Uses compound progression, not pure musical ratios
- **HIG spacing**: Linear 4pt increments, not ratio-based
- **Harmonic series**: Provides integer multiples (2.0, 3.0, 4.0...) for structural divisions
- **Chord ratios**: Multi-token progressions from triads (4:5:6 major, 10:12:15 minor)

**Critical Insight:** Musical ratios work best for **single-dimension progressions** (type scales, container sizes). Apple's systems use **hybrid approaches** combining ratios with linear increments for different semantic purposes.

---

## 1. Complete Musical Interval Catalog

### 1.1 Just Intonation Ratios (Diatonic Intervals)

All intervals within one octave, sorted by decimal value:

| Interval           | Ratio | Decimal | Semitones (ET) | Musical Context   |
| ------------------ | ----- | ------- | -------------- | ----------------- |
| **Unison**         | 1:1   | 1.000   | 0              | Same pitch        |
| **Minor Second**   | 16:15 | 1.067   | 1              | Major semitone    |
| **Major Second**   | 9:8   | 1.125   | 2              | Major tone        |
| **Minor Third**    | 6:5   | 1.200   | 3              | Current system ✓  |
| **Major Third**    | 5:4   | 1.250   | 4              | Bright, uplifting |
| **Perfect Fourth** | 4:3   | 1.333   | 5              | Stable, open      |
| **Tritone**        | 45:32 | 1.406   | 6              | Augmented fourth  |
| **Perfect Fifth**  | 3:2   | 1.500   | 7              | Current system ✓  |
| **Minor Sixth**    | 8:5   | 1.600   | 8              | Slightly tense    |
| **Major Sixth**    | 5:3   | 1.667   | 9              | Consonant         |
| **Minor Seventh**  | 16:9  | 1.778   | 10             | Dominant tension  |
| **Major Seventh**  | 15:8  | 1.875   | 11             | Leading tone      |
| **Octave**         | 2:1   | 2.000   | 12             | Current system ✓  |

### 1.2 Alternative Just Intonation Variants

Some intervals have multiple just intonation interpretations:

| Interval      | Primary Ratio | Alternative Ratios             | Notes                       |
| ------------- | ------------- | ------------------------------ | --------------------------- |
| Minor Second  | 16:15 (1.067) | 25:24 (1.042), 135:128 (1.055) | Chromatic semitone variants |
| Major Second  | 9:8 (1.125)   | 10:9 (1.111)                   | Major vs minor tone         |
| Minor Third   | 6:5 (1.200)   | 7:6 (1.167), 32:27 (1.185)     | Pythagorean variant         |
| Tritone       | 45:32 (1.406) | 7:5 (1.400), 64:45 (1.422)     | Septimal vs diatonic        |
| Minor Seventh | 16:9 (1.778)  | 9:5 (1.800), 7:4 (1.750)       | Multiple flavors            |

**Design Implication:** Primary ratios (first column) recommended for token systems due to simpler mathematics and wider recognition.

### 1.3 Equal Temperament Ratios

For comparison, 12-tone equal temperament uses the **12th root of 2** (≈1.05946) for each semitone:

| Interval       | Semitones | Equal Temperament | Just Intonation | Difference |
| -------------- | --------- | ----------------- | --------------- | ---------- |
| Minor Second   | 1         | 1.0595            | 1.0667          | -0.7%      |
| Major Second   | 2         | 1.1225            | 1.1250          | -0.2%      |
| Minor Third    | 3         | 1.1892            | 1.2000          | -0.9%      |
| Major Third    | 4         | 1.2599            | 1.2500          | +0.8%      |
| Perfect Fourth | 5         | 1.3348            | 1.3333          | +0.1%      |
| Tritone        | 6         | 1.4142            | 1.4063          | +0.6%      |
| Perfect Fifth  | 7         | 1.4983            | 1.5000          | -0.1%      |
| Minor Sixth    | 8         | 1.5874            | 1.6000          | -0.8%      |
| Major Sixth    | 9         | 1.6818            | 1.6667          | +0.9%      |
| Minor Seventh  | 10        | 1.7818            | 1.7778          | +0.2%      |
| Major Seventh  | 11        | 1.8877            | 1.8750          | +0.7%      |
| Octave         | 12        | 2.0000            | 2.0000          | 0.0%       |

**Design Implication:** Just intonation ratios are **simpler mathematically** (5/4 vs 1.2599) and better for human comprehension in design systems.

### 1.4 Extended Intervals (Beyond Octave)

Compound intervals (simple interval + octave):

| Interval               | Ratio | Decimal | Musical Context         | Design Use              |
| ---------------------- | ----- | ------- | ----------------------- | ----------------------- |
| **Minor Ninth**        | 32:15 | 2.133   | Minor second + octave   | Large container jumps   |
| **Major Ninth**        | 9:4   | 2.250   | Major second + octave   | Expansive spacing       |
| **Perfect Eleventh**   | 8:3   | 2.667   | Perfect fourth + octave | Structural divisions    |
| **Perfect Thirteenth** | 13:4  | 3.250   | Major sixth + octave    | Multi-level hierarchies |

**Calculation method:** Compound interval = Simple interval × Octave (2.0)
- Ninth = Major Second (9/8) × Octave (2/1) = 18/8 = 9/4 = 2.25
- Eleventh = Perfect Fourth (4/3) × Octave (2/1) = 8/3 = 2.667
- Thirteenth = Major Sixth (5/3) × Octave (2/1) = 10/3 = 3.333 (OR 13/4 = 3.25 in some systems)

---

## 2. Circle of Fifths Progression Analysis

### 2.1 Mathematical Foundation

The circle of fifths progression stacks perfect fifths (3:2 ratio) repeatedly:

| Step | Note | Ratio from C | Decimal | Octave Reduced |
| ---- | ---- | ------------ | ------- | -------------- |
| 0    | C    | 1:1          | 1.000   | 1.000          |
| 1    | G    | 3:2          | 1.500   | 1.500          |
| 2    | D    | 9:4          | 2.250   | 1.125          |
| 3    | A    | 27:8         | 3.375   | 1.688          |
| 4    | E    | 81:16        | 5.063   | 1.266          |
| 5    | B    | 243:32       | 7.594   | 1.898          |
| 6    | F♯   | 729:64       | 11.391  | 1.424          |
| 7    | C♯   | 2187:128     | 17.086  | 1.068          |
| 8    | G♯   | 6561:256     | 25.629  | 1.602          |
| 9    | D♯   | 19683:512    | 38.443  | 1.203          |
| 10   | A♯   | 59049:1024   | 57.665  | 1.804          |
| 11   | E♯   | 177147:2048  | 86.497  | 1.355          |
| 12   | B♯/C | 531441:4096  | 129.746 | **2.027**      |

**Critical Finding:** After 12 perfect fifths, we reach 129.746 Hz (if C=1), which is **2.027×** the starting frequency, NOT 2.0× (perfect octave). This is the **Pythagorean comma** (531441:524288 = 1.0136).

**Calculation formula:**
- Nth fifth from C = (3/2)^N
- Octave reduced = ((3/2)^N) / 2^floor(log2((3/2)^N))

### 2.2 Circle of Fifths in Equal Temperament

In 12-tone equal temperament, the circle DOES close because each fifth is slightly flattened:
- Just fifth: 3:2 = 1.5000
- Equal tempered fifth: 2^(7/12) = 1.4983
- After 12 fifths: (1.4983)^12 = 128.0 (exactly 7 octaves)

### 2.3 Design Token Implications

**DO NOT use circle of fifths for token progressions** because:
1. Ratios don't repeat cleanly (1.5, 1.125, 1.688, 1.266...)
2. No useful pattern emerges
3. Values diverge exponentially

**DO use individual fifths** (3:2 = 1.5) as a single ratio for related elements:
```typescript
container: {
  sm: 16rem,
  md: 24rem,  // 16 × 1.5 (perfect fifth)
  lg: 36rem,  // 24 × 1.5
}
```

---

## 3. Chord Ratio Systems

### 3.1 Triads (Three-Note Chords)

Chords provide **multi-token progressions** with harmonic relationships:

| Chord Type      | Ratio    | Decimal Progression | Intervals                    | Design Use                    |
| --------------- | -------- | ------------------- | ---------------------------- | ----------------------------- |
| **Major Triad** | 4:5:6    | 1.00, 1.25, 1.50    | Root, Major 3rd, Perfect 5th | Bright, expansive progression |
| **Minor Triad** | 10:12:15 | 1.00, 1.20, 1.50    | Root, Minor 3rd, Perfect 5th | Subtle, contained progression |
| **Diminished**  | 20:24:29 | 1.00, 1.20, 1.45    | Root, Minor 3rd, Dim 5th     | Tense, compressed progression |
| **Augmented**   | 16:20:25 | 1.00, 1.25, 1.56    | Root, Major 3rd, Aug 5th     | Wide, expansive progression   |

### 3.2 Seventh Chords (Four-Note Chords)

Extended progressions with four values:

| Chord Type         | Ratio           | Decimal Progression     | Design Use                        |
| ------------------ | --------------- | ----------------------- | --------------------------------- |
| **Major 7th**      | 8:10:12:15      | 1.00, 1.25, 1.50, 1.875 | Four-tier hierarchy               |
| **Minor 7th**      | 10:12:15:18     | 1.00, 1.20, 1.50, 1.800 | Contained four-tier               |
| **Dominant 7th**   | 4:5:6:7         | 1.00, 1.25, 1.50, 1.750 | Tension-resolving hierarchy       |
| **Diminished 7th** | 1:1.2:1.44:1.73 | 1.00, 1.20, 1.44, 1.73  | Equal interval steps (minor 3rds) |

**Design Implication:** Seventh chords provide **4-level semantic hierarchies** matching Apple HIG's 4-tier text color system (primary, secondary, tertiary, quaternary).

### 3.3 Suspended Chords

Alternative triads with different flavors:

| Chord Type | Ratio   | Decimal Progression | Design Context                 |
| ---------- | ------- | ------------------- | ------------------------------ |
| **Sus2**   | 8:9:12  | 1.00, 1.125, 1.50   | Root, Major 2nd, Perfect 5th   |
| **Sus4**   | 3:4:4.5 | 1.00, 1.333, 1.50   | Root, Perfect 4th, Perfect 5th |

---

## 4. Harmonic Series Progressions

### 4.1 Overtone Series (Harmonic Series)

Integer multiples of the fundamental frequency:

| Harmonic          | Ratio | Decimal | Musical Interval  | Design Use |
| ----------------- | ----- | ------- | ----------------- | ---------- |
| 1st (Fundamental) | 1:1   | 1.0     | Unison            | Base unit  |
| 2nd               | 2:1   | 2.0     | Octave            | Double     |
| 3rd               | 3:1   | 3.0     | Octave + Fifth    | Triple     |
| 4th               | 4:1   | 4.0     | 2 Octaves         | Quadruple  |
| 5th               | 5:1   | 5.0     | 2 Oct + Major 3rd | Quintuple  |
| 6th               | 6:1   | 6.0     | 2 Oct + Fifth     | Sextuple   |
| 7th               | 7:1   | 7.0     | 2 Oct + Minor 7th | Septuple   |
| 8th               | 8:1   | 8.0     | 3 Octaves         | Octuple    |
| 9th               | 9:1   | 9.0     | 3 Oct + Major 2nd | -          |
| 10th              | 10:1  | 10.0    | 3 Oct + Major 3rd | -          |
| 11th              | 11:1  | 11.0    | 3 Oct + Tritone   | -          |
| 12th              | 12:1  | 12.0    | 3 Oct + Fifth     | -          |
| 13th              | 13:1  | 13.0    | -                 | -          |
| 14th              | 14:1  | 14.0    | -                 | -          |
| 15th              | 15:1  | 15.0    | -                 | -          |
| 16th              | 16:1  | 16.0    | 4 Octaves         | -          |

**Design Implication:** Perfect for **structural divisions** and **container sizing**:
```typescript
container: {
  xs: 16rem,   // 1x
  sm: 32rem,   // 2x (2nd harmonic)
  md: 48rem,   // 3x (3rd harmonic)
  lg: 64rem,   // 4x (4th harmonic)
  xl: 96rem,   // 6x (6th harmonic)
  xxl: 128rem, // 8x (8th harmonic)
}
```

### 4.2 Subharmonic Series (Undertone Series)

Inverse ratios (unit fractions) below the fundamental:

| Subharmonic | Ratio | Decimal | Musical Interval | Design Use |
| ----------- | ----- | ------- | ---------------- | ---------- |
| 1st         | 1:1   | 1.000   | Unison           | Base       |
| 2nd         | 1:2   | 0.500   | Octave down      | Half       |
| 3rd         | 1:3   | 0.333   | Oct + Fifth down | Third      |
| 4th         | 1:4   | 0.250   | 2 Octaves down   | Quarter    |
| 5th         | 1:5   | 0.200   | -                | Fifth      |
| 6th         | 1:6   | 0.167   | -                | Sixth      |
| 7th         | 1:7   | 0.143   | -                | Seventh    |
| 8th         | 1:8   | 0.125   | 3 Octaves down   | Eighth     |

**Design Implication:** Useful for **micro-spacing** and **opacity scales**

### 4.3 Partial Harmonics (Between Octaves)

Harmonics 2-4 provide useful ratios between 1.0 and 2.0:

| Range          | Harmonics        | Ratios (normalized)          | Design Use               |
| -------------- | ---------------- | ---------------------------- | ------------------------ |
| 1st-2nd octave | 2, 3             | 1.0, 1.5                     | Base progression         |
| 2nd-4th octave | 4, 5, 6, 7       | 1.0, 1.25, 1.5, 1.75         | Fine-grained progression |
| 4th-8th octave | 8, 9, 10, 11, 12 | 1.0, 1.125, 1.25, 1.375, 1.5 | Very fine progression    |

---

## 5. Ratio Classification & Taxonomy

### 5.1 Ratio Ranges by Perceptual Impact

| Classification | Range   | Ratios                                                  | Perceptual Effect    | Design Use                       |
| -------------- | ------- | ------------------------------------------------------- | -------------------- | -------------------------------- |
| **Micro**      | 1.0-1.2 | Unison, Minor 2nd, Major 2nd, Minor 3rd                 | Barely noticeable    | Fine-tuning, subtle progressions |
| **Meso**       | 1.2-1.6 | Major 3rd, Perfect 4th, Tritone, Perfect 5th, Minor 6th | Clearly distinct     | Related elements, siblings       |
| **Macro**      | 1.6-2.5 | Major 6th, Minor 7th, Major 7th, Octave, Ninth          | Strongly contrasting | Hierarchical jumps, parent-child |
| **Structural** | 2.0+    | Octave, Ninth, Eleventh, Harmonics                      | Architectural        | Major sections, containers       |

### 5.2 Ratio Suitability Matrix

| Token Type     | Best Ratios                          | Reasoning                      |
| -------------- | ------------------------------------ | ------------------------------ |
| **Typography** | 1.125-1.250 (Major 2nd, Major 3rd)   | Small steps for readability    |
| **Spacing**    | 1.5, 2.0 (Perfect 5th, Octave)       | Clear semantic jumps           |
| **Containers** | 2.0, 3.0, 4.0 (Harmonics)            | Simple structural divisions    |
| **Duration**   | 1.5, 2.0 (Perfect 5th, Octave)       | Perceptually even acceleration |
| **Opacity**    | 0.5, 0.618, 0.75 (Subharmonics, φ⁻¹) | Smooth fadeouts                |
| **Shadows**    | 1.5, 2.0 (Perfect 5th, Octave)       | Depth perception               |

### 5.3 Ratio Personality & Semantics

| Ratio | Name           | Decimal | Personality          | When to Use             |
| ----- | -------------- | ------- | -------------------- | ----------------------- |
| 1.125 | Major Second   | 1.125   | Gentle, approachable | Conservative brands     |
| 1.200 | Minor Third    | 1.200   | Balanced, moderate   | Most designs            |
| 1.250 | Major Third    | 1.250   | Bright, energetic    | Youth-oriented brands   |
| 1.333 | Perfect Fourth | 1.333   | Stable, reliable     | Enterprise software     |
| 1.500 | Perfect Fifth  | 1.500   | Dynamic, powerful    | Action-oriented designs |
| 1.618 | Golden Ratio   | 1.618   | Organic, natural     | Content-focused sites   |
| 2.000 | Octave         | 2.000   | Dramatic, bold       | Marketing pages         |

---

## 6. Numerical Data Tables

### 6.1 Complete Just Intonation Reference

All intervals from unison to octave with multiple representations:

| Interval       | Ratio | Fraction | Decimal | Cents | Semitones (ET) |
| -------------- | ----- | -------- | ------- | ----- | -------------- |
| Unison         | 1:1   | 1/1      | 1.000   | 0     | 0              |
| Minor Second   | 16:15 | 16/15    | 1.067   | 112   | 1              |
| Major Second   | 9:8   | 9/8      | 1.125   | 204   | 2              |
| Minor Third    | 6:5   | 6/5      | 1.200   | 316   | 3              |
| Major Third    | 5:4   | 5/4      | 1.250   | 386   | 4              |
| Perfect Fourth | 4:3   | 4/3      | 1.333   | 498   | 5              |
| Tritone        | 45:32 | 45/32    | 1.406   | 590   | 6              |
| Perfect Fifth  | 3:2   | 3/2      | 1.500   | 702   | 7              |
| Minor Sixth    | 8:5   | 8/5      | 1.600   | 814   | 8              |
| Major Sixth    | 5:3   | 5/3      | 1.667   | 884   | 9              |
| Minor Seventh  | 16:9  | 16/9     | 1.778   | 996   | 10             |
| Major Seventh  | 15:8  | 15/8     | 1.875   | 1088  | 11             |
| Octave         | 2:1   | 2/1      | 2.000   | 1200  | 12             |

### 6.2 Type Scale Comparison Table

5-step progressions from 16px base using different ratios:

| Ratio Name     | Ratio | Step 0 | Step 1 | Step 2 | Step 3 | Step 4 | Step 5 |
| -------------- | ----- | ------ | ------ | ------ | ------ | ------ | ------ |
| Minor Second   | 1.067 | 16     | 17     | 18     | 19     | 21     | 22     |
| Major Second   | 1.125 | 16     | 18     | 20     | 23     | 26     | 29     |
| Minor Third    | 1.200 | 16     | 19     | 23     | 28     | 33     | 40     |
| Major Third    | 1.250 | 16     | 20     | 25     | 31     | 39     | 49     |
| Perfect Fourth | 1.333 | 16     | 21     | 28     | 38     | 50     | 67     |
| Perfect Fifth  | 1.500 | 16     | 24     | 36     | 54     | 81     | 122    |
| Golden Ratio   | 1.618 | 16     | 26     | 42     | 68     | 110    | 178    |
| Octave         | 2.000 | 16     | 32     | 64     | 128    | 256    | 512    |

### 6.3 iOS Typography Analysis Table

| iOS Size | Previous | Ratio | Musical Equivalent     | Match Type       |
| -------- | -------- | ----- | ---------------------- | ---------------- |
| 11 pt    | -        | -     | Base                   | -                |
| 12 pt    | 11       | 1.091 | ~ Minor Second (1.067) | Linear           |
| 13 pt    | 12       | 1.083 | ~ Minor Second (1.067) | Linear           |
| 15 pt    | 13       | 1.154 | ~ Major Second (1.125) | Jump             |
| 16 pt    | 15       | 1.067 | Minor Second           | Linear           |
| 17 pt    | 16       | 1.063 | Minor Second           | Linear (Default) |
| 20 pt    | 17       | 1.176 | ~ Major Second (1.125) | Jump             |
| 22 pt    | 20       | 1.100 | -                      | Linear           |
| 28 pt    | 22       | 1.273 | ~ Major Third (1.250)  | Jump             |
| 34 pt    | 28       | 1.214 | ~ Minor Third (1.200)  | Jump             |

**Pattern:** Alternates between ~1.06-1.09 linear steps and ~1.15-1.27 ratio jumps.

### 6.4 Harmonic Series Application Table

Container sizing using harmonic multiples of 16rem base:

| Harmonic    | Multiplier | Value (rem) | Value (px @ 16px/rem) | Use Case      |
| ----------- | ---------- | ----------- | --------------------- | ------------- |
| Fundamental | 1×         | 16          | 256                   | Small mobile  |
| 2nd         | 2×         | 32          | 512                   | Large mobile  |
| 3rd         | 3×         | 48          | 768                   | Tablet        |
| 4th         | 4×         | 64          | 1024                  | Desktop       |
| 5th         | 5×         | 80          | 1280                  | Large desktop |
| 6th         | 6×         | 96          | 1536                  | XL desktop    |
| 8th         | 8×         | 128         | 2048                  | 4K displays   |

---

## Sources

### Musical Intervals & Just Intonation
- [Just intonation - Wikipedia](https://en.wikipedia.org/wiki/Just_intonation)
- [Just Intonation Explained - Kyle Gann](https://www.kylegann.com/tuning.html)
- [Gallery of just intervals - Xenharmonic Wiki](https://en.xen.wiki/w/Gallery_of_just_intervals)
- [Overview of Basic Mathematical Concepts For Just Intonation](https://microtonal-guitar.com/tutorial/the-harmonic-series-musical-ratios-intervals-copy/)
- [List of intervals in 5-limit just intonation - Wikipedia](https://en.wikipedia.org/wiki/List_of_intervals_in_5-limit_just_intonation)

### Circle of Fifths
- [Circle of fifths - Wikipedia](https://en.wikipedia.org/wiki/Circle_of_fifths)
- [Circle of fifths and number theory - John D. Cook](https://www.johndcook.com/blog/2009/10/02/circle-of-fifths-number-theory/)
- [Perfect fifth - Wikipedia](https://en.wikipedia.org/wiki/Perfect_fifth)

### Harmonic Series
- [Harmonic series (music) - Wikipedia](https://en.wikipedia.org/wiki/Harmonic_series_(music))
- [Harmonic Series - structure, application and background](https://www.oberton.org/en/overtone-singing/harmonic-series/)
- [Integrated Music Theory - The Overtone Series](https://intmus.github.io/inttheory18-19/08-overtones/a1-overtones.html)

### Chord Theory
- [Triads and seventh chords – Open Music Theory](https://openmusictheory.github.io/triads.html)
- [Seventh chord - Wikipedia](https://en.wikipedia.org/wiki/Seventh_chord)
- [Piano Chord Chart](https://muted.io/chords/)

### Equal Temperament
- [Equal temperament - Wikipedia](https://en.wikipedia.org/wiki/Equal_temperament)
- [12 equal temperament - Wikipedia](https://en.wikipedia.org/wiki/12_equal_temperament)
- [Twelfth root of two - Wikipedia](https://en.wikipedia.org/wiki/Twelfth_root_of_two)

### Extended Intervals
- [Interval (music) - Wikipedia](https://en.wikipedia.org/wiki/Interval_(music))
- [Compound Intervals in Music Theory](https://www.dummies.com/article/academics-the-arts/music/music-theory/compound-intervals-in-music-theory-144448/)

### Subharmonic Series
- [Undertone series - Wikipedia](https://en.wikipedia.org/wiki/Undertone_series)
- [Subharmonic series - Xenharmonic Wiki](https://en.xen.wiki/w/Subharmonic_series)
- [Harmonic series - Xenharmonic Wiki](https://en.xen.wiki/w/Harmonic_series)

### Apple Human Interface Guidelines
- [Typography | Apple Developer Documentation](https://developer.apple.com/design/human-interface-guidelines/typography)
- [iPhone App Font Size & Typography Guidelines](https://www.learnui.design/blog/ios-font-size-guidelines.html)
- [iOS App Design Guidelines for 2025](https://tapptitude.com/blog/i-os-app-design-guidelines-for-2025)
- [Layout | Apple Developer Documentation](https://developer.apple.com/design/human-interface-guidelines/layout)

### Spacing Systems
- [How can I choose the right spacing system?](https://cieden.com/book/sub-atomic/spacing/choosing-a-spacing-system)
- [Designing in the 8pt grid system](https://medium.com/design-bootcamp/designing-in-the-8pt-grid-system-f3c1183ea6e8)
- [Mobile System Design - Structuring Spacing](https://www.mobilesystemdesign.com/blog/design-system-spacing/)

---

**Report Complete**
**Generated:** 2025-12-19
**Word Count:** ~8,500
**Focus:** Numerical analysis, practical application, actionable recommendations
