# Fragment Authoring Reference — System 2

Canonical authoring guide for `INTIMATE_RESPONSE_LIBRARY`. Six layers picked independently per scene turn, assembled into one `IntimateResponse` by `assembleIntimateResponse()`.

---

## Key Scheme

All keys: `<layer>:<segment>:<segment>...` in snake\_case. Picker walks a fallback chain from most-specific to least-specific, returns a random string from the first non-empty bucket hit.

```ts
"body_act:thrust_slow:arousal_high:once": [
  "Her inner walls grip greedily around the stroke...",
]
```

---

## ⚠️ Forced Intimacy Gap — Pending Phase 54

`sceneStartType` and `partnerEngagementStatus` are **not** in the VOCAL, BODY\_ACTION, or PLAYER\_LINE key chains. `engagement_<eng>` exists only in NARRATION.

**Tracked as Phase 54 in task\_list.md. Status column shows which sub-phase wires each:**

| Layer | Phase 54 addition | Status |
| --- | --- | --- |
| `VOCAL` | `engagement_<eng>` tiers after `subspace`, before `shame_<tier>` | ⏳ Phase 54a |
| `BODY_ACTION` | `body_act:<actionId>:arousal_<band>:engagement_<eng>` (resisting / fainted only) | ⏳ Phase 54b |
| `NARRATION` | `narration:<actionId>:force_sleeping` for sleeping-victim scenes | ⏳ Phase 54c |
| `PLAYER_LINE` | `player:<actionId>:force` for coercive player lines | ⏳ Phase 54d |

Pre-author Phase 54 keys now — they won't fire until wired, but they'll be ready. **Current proxy:** author resistance content into `shame_high:arousal_low` VOCAL keys and `engagement_resisting` NARRATION keys until engineering wires the fix.

---

## Variable Reference

### `arousalBand`

`low` (0–30) · `mid` (31–65) · `high` (66–85) · `edge` (86–100)

### `shameTier`

`low` (<30) · `mid` (30–65) · `high` (>65)

### `repeatTier`

`once` (≤1) · `repeat` (=2) · `extended` (>2)

### `wetnessLevel` (lowercase in keys)

`dry` · `damp` · `moderate` · `wet` · `very_wet` · `dripping` · `flooding`

### `orgasmType` (lowercase)

`clitoral` · `vaginal` · `anal` · `combined` · `multiple` · `squirting` · `rare`

### `partnerEngagementStatus` → `<eng>` (lowercase; NARRATION now; VOCAL + BODY\_ACTION after Phase 54a/54b)

`neutral` · `resisting` · `hesitant` · `aroused` · `horny` · `fainted`

### `sceneStartType` (partial after Phase 54 — force\_sleeping in NARRATION \[54c\], player:force in PLAYER\_LINE \[54d\])

`CONSENSUAL` · `CONSENSUAL_GROUP` · `FORCE_INTIMACY` · `FORCE_INTIMACY_SLEEPING` · `POST_DEFEAT`

### `resistanceProfileType` (context only)

`FIGHT` · `FREEZE` · `COMPLY` · `ENJOY`

### Monster races (VOCAL overlay, lowercased)

`succubus` · `incubus` · `fox_girl` · `fox_boy` · `wolf_girl` · `wolf_boy` · `cow_girl` · `cow_boy` · `dragon_girl` · `dragon_boy` · `demon` · `orc` · `goblin`

---

## Action IDs

### Penetrative

`thrust_slow` · `thrust_fast` · `thrust_deep` · `vaginal_pound` · `cervix_knock` · `gspot_rub` · `anal_thrust` · `anal_pound` · `anal_deep`

### Oral (player-led)

`lick_vagina` · `suck_clit` · `lick_anal`

### Oral (character-led)

`blowjob_passive` · `deepthroat` · `throatfuck` · `facefuck`

### Fingering / Manual

`finger_vagina` · `finger_anal` · `gspot_finger` · `rub_clit` · `handjob`

### Breast / Nipple

`stroke_breasts` · `suck_nipples` · `pinch_nipples` · `bite_nipples` · `nipple_twist` · `breast_pull` · `heavy_breast_massage` · `breast_milk`

### Touch / Sensation

`kiss` · `neck_kiss` · `neck_bite` · `ear_lick` · `thigh_kiss` · `caress_body` · `whisper` · `squeeze_ass`

### Dominance / Impact

`force_hold` · `hair_pull` · `choke` · `face_slap` · `spank_ass` · `spank_breast`

### Cum

`cum_inside` · `cum_on_face` · `cum_on_breast` · `cum_on_belly` · `cum_in_mouth` · `cum_on_ass` · `cum_on_thighs`

### Special

`belly_kiss` · `belly_massage` · `edging` · `lamia_constrict`

---

## Body Zones (BODY\_ACTION zone fallback)

`vagina` · `clit` · `anal` · `breast` · `nipple` · `ass` · `mouth` · `throat` · `neck` · `belly` · `thigh` · `ear` · `body`

---

## Position IDs

### Missionary family

`missionary` · `legs_up` · `legs_pinned` · `prone_bone` · `breeding_press`

### From behind

`doggy` · `flat_doggy` · `standing_doggy` · `full_nelson` · `spooning`

### Girl on top

`cowgirl` · `reverse_cowgirl` · `squatting_cowgirl` · `grinding_cowgirl`

### Standing

`wall_pin` · `lifted` · `bent_over` · `standing_facing`

### Sitting

`lap_facing` · `lap_away` · `chair` · `edge_of_bed`

### Oral / Throat / Anal

`kneeling_oral` · `head_off_edge` · `sitting_oral` · `sitting_on_face` · `sixty_nine` · `throat_kneel` · `throat_lying` · `doggy_anal` · `prone_anal` · `missionary_anal` · `standing_anal` · `spooning_anal`

### Restraint

`pinned_wrists` · `spread_held` · `face_down_held` · `hair_grip` · `lifted_held_open`

# Layer 1 — NARRATION

**Authoring note:** Third-person scene description. What the camera sees. Physical, environmental, cinematic. Concrete physical detail only. Two sentences max. No character voice, no inner monologue. Present tense.

## Key Pattern

```
narration:<actionId>:tec_fail
narration:<actionId>:force_sleeping          ← Phase 54c
narration:<actionId>:engagement_<eng>
narration:<actionId>
narration:generic
```

## All Keys × Variables

```
narration:<actionId>:tec_fail
narration:<actionId>:force_sleeping          ← Phase 54c — FORCE_INTIMACY_SLEEPING only
narration:<actionId>:engagement_neutral
narration:<actionId>:engagement_hesitant
narration:<actionId>:engagement_resisting    ← primary forced intimacy key
narration:<actionId>:engagement_aroused
narration:<actionId>:engagement_horny
narration:<actionId>:engagement_fainted
narration:<actionId>
narration:generic
```

## Examples

### `narration:thrust_slow:tec_fail`

- "The angle is wrong. She flinches and her muscles clench tight, cutting the motion short."
- "A mis-step in the rhythm — she lurches, shoulder twisting away from the contact."
- "The approach is off. She braces and goes rigid, breath catching on a sharp inhale."

### `narration:thrust_slow:engagement_resisting`

- "Her hands twist against the grip holding her wrists, knuckles pale. Each slow push drags a rough, expelled breath from her."
- "She keeps her head turned toward the wall. Her spine stays flat and locked, absorbing each motion with deliberate non-response."
- "The sheets bunch under her clenched fists. Her body is stiff from shoulders to thighs, held in tight, ungiving resistance."
- "Her eyes are open and fixed at the ceiling. Every muscle is braced, her body a locked argument against what's happening to it."

### `narration:thrust_slow:engagement_hesitant`

- "Her hips shift — an uncertain movement, half-pull and half-push. Her expression is caught between something and nothing."
- "She exhales carefully, as if controlling herself from the outside. Her hands have relaxed their grip on the sheet."

### `narration:thrust_slow:engagement_aroused`

- "Her hips lift in rhythm to meet the stroke. A light sheen of sweat catches along her collarbone."
- "Her back curves slightly off the mattress with each push, and she makes no effort to hide it."

### `narration:thrust_slow:engagement_horny`

- "She's pulling with her legs, drawing deeper, spine arching. The sounds she makes are helpless and continuous."
- "Her entire body is chasing it — hips rolling, thighs gripping, one hand pressed flat against her own stomach."

### `narration:thrust_slow:engagement_fainted`

- "Her body is slack, fully given over to the motion. Her face is soft and unresponsive against the pillow."
- "She lies inert, chest rising in slow shallow pulls. Her limbs move only where he moves them."

### `narration:thrust_slow`

- "The slow drag of the motion fills the silence. Her body shudders with each withdrawal, heels pressing into the bed."
- "A steady rhythm. The wet sounds are low and continuous; her chest rises and falls in double-time."

### `narration:spank_ass`

- "Her body lurches forward with the impact, ass reddening at the contact point. The sound of it rings off the walls."
- "The strike catches her mid-exhale. Her hips jerk forward, and she goes briefly rigid."

### `narration:choke`

- "Her hands come up instinctively, fingers wrapping around the wrist at her throat. Her face flushes deep."
- "The grip closes, and she stills — not from submission but from instinct, every muscle held in suspended protest."

### `narration:cum_inside:engagement_resisting`

- "Her body locks. Her hands find his forearms and grip hard — too late, too weak. Her face turns away."
- "She goes still at the first pulse, jaw clenched, head pressing back into the pillow."

### `narration:generic`

- "Her body responds to the motion, small sounds escaping before she can catch them."
- "The room holds only the sounds of the encounter — breath and skin and movement."

# Layer 2 — BODY\_POSITION

**Authoring note:** Describe what the position looks like — how bodies are arranged, what is visible, what is exposed. The base key (no band) is static geometry. The `arousal_<band>` variant is what changes as the scene progresses: her expression and body language at that arousal level.

Picked **once per position change** only, not every turn.

## Key Pattern

```
body_pos:<positionId>:arousal_<band>
body_pos:<positionId>
body_pos:generic
```

## All Keys × Variables

```
body_pos:<positionId>:arousal_low
body_pos:<positionId>:arousal_mid
body_pos:<positionId>:arousal_high
body_pos:<positionId>:arousal_edge
body_pos:<positionId>
body_pos:generic
```

## Examples

### `body_pos:missionary`

- "She lies beneath him, face-up, legs apart. Her body is accessible from this angle, every expression visible."

### `body_pos:missionary:arousal_low`

- "She lies flat on her back, arms stiff at her sides. Her jaw is set, gaze fixed at the ceiling."
- "Both arms are rigid beside her, shoulders pressed flat. Her breathing is shallow and controlled."
- "She stares straight up, spine flat, making no adjustments. Her hands have fisted in the sheet."

### `body_pos:missionary:arousal_mid`

- "She's half-reclined, one knee fallen slightly outward. Her lips are parted, eyes not quite focused."
- "Her head is tilted back a degree. One hand rests open on the pillow beside her hip."

### `body_pos:missionary:arousal_high`

- "Her head is thrown back, throat exposed. Her hands grip the pillow over her head, fingers white."
- "Her back has begun to curve upward between her shoulder blades. One knee presses hard against his flank."

### `body_pos:missionary:arousal_edge`

- "She's trembling, thighs shaking where they bracket his hips. Her face is flushed and loose, eyes rolled half-back."
- "Every limb is tensed in a different direction — one leg hooked, one arm bracing, mouth open on nothing."

### `body_pos:doggy:arousal_low`

- "She's on hands and knees, spine rigid and flat, hair fallen forward to hide her face. Her arms are locked straight."
- "Her head is angled down, expression invisible beneath the curtain of her hair. She braces like someone enduring."

### `body_pos:doggy:arousal_mid`

- "Her elbows have softened, lowering her chest slightly. Her back has a curve in it now. Her mouth is open."

### `body_pos:doggy:arousal_high`

- "She's dropped to her forearms, cheek pressed into the pillow, hips raised. Her thighs are trembling at the inside."

### `body_pos:doggy:arousal_edge`

- "She's collapsed forward onto her forearms, hips rocking back involuntarily. Her hands have twisted into fists in the pillow."

### `body_pos:full_nelson:arousal_low`

- "Her arms are hooked and pinned behind her neck, torso fully exposed and lifted. Her face is turned sharply aside."
- "She's suspended by the hold, chest forced out, spine arched. Every muscle in her body is rigid with refusal."

### `body_pos:full_nelson:arousal_high`

- "She hangs in the grip, body shaking. Her head has tipped back, throat bare. She can't close anything."

### `body_pos:breeding_press:arousal_high`

- "She's flat on her back, legs pressed fully forward toward her chest. His full weight is on her and she cannot move."

### `body_pos:breeding_press:arousal_edge`

- "Her legs are pinned against her own chest. She's shaking, face slack, hips still trying to respond with nowhere to go."

### `body_pos:cowgirl:arousal_low`

- "She sits upright on top, hands on her own thighs, weight controlled. Her expression is deliberately blank."

### `body_pos:cowgirl:arousal_mid`

- "She's leaned forward slightly, palms on his chest. Her hair has fallen loose. Her expression has given up being careful."

### `body_pos:cowgirl:arousal_high`

- "She's leaning forward, palms on his chest, hips rolling. Her hair falls around her face. She's given up pretending to be still."

### `body_pos:cowgirl:arousal_edge`

- "She's collapsed forward, chest to chest, rocking. Her face is buried in the crook of his neck. Every breath is audible."

### `body_pos:wall_pin:arousal_low`

- "She's pressed flat against the surface, one cheek turned to the wall. Both hands push against the stone."
- "Her back is to the wall, arms braced, chin down. Everything about her posture says no."

### `body_pos:wall_pin:arousal_high`

- "She's braced against the wall but the bracing has changed — her hips have tilted outward, spine curving in."

### `body_pos:spooning:arousal_low`

- "She lies on her side, arms folded across her chest, turned slightly away from him. Minimal contact."

### `body_pos:spooning:arousal_high`

- "She's pressed back against him fully, one arm hooked behind to grip. Her head is tipped back onto his shoulder."

### `body_pos:throat_kneel:arousal_low`

- "She's kneeling on the floor, hands in her lap. Her posture is careful and precise — not quite submission, not quite defiance."

### `body_pos:throat_kneel:arousal_mid`

- "She's kneeling, hands resting loosely at her sides now. Her chin is tipped slightly upward."

### `body_pos:sitting_on_face:arousal_high`

- "She sits over him, thighs bracketing his head, hands braced against the headboard. Her weight is pressing down."

### `body_pos:lifted_held_open:arousal_low`

- "She's lifted fully off the floor, legs held apart, the entirety of her weight dependent on his grip. Her hands strain at the hold."

### `body_pos:lifted_held_open:arousal_edge`

- "Suspended and open, she can't do anything but receive. Her head has fallen back. She's stopped trying to close her legs."

### `body_pos:generic`

- "Her body is arranged and accessible, expression shifting with each motion."

# Layer 3 — BODY\_ACTION

**Authoring note:** What her body does in response to this action this turn. Show the involuntary physical feedback. The repeat axis is where habituation, overstimulation, and escalation live. No inner thought, no dialogue — only what the body does.

## Key Pattern (fallback chain order)

```
body_act:<actionId>:orgasm:<orgasmType>              ← only when isOrgasming
body_act:<actionId>:arousal_<band>:subspace          ← only when subspaceActive
body_act:<actionId>:arousal_<band>:engagement_<eng>  ← Phase 54b (resisting/fainted only)
body_act:<actionId>:arousal_<band>:<repeatTier>
body_act:<actionId>:arousal_<band>
body_act:<bodyZone>:arousal_<band>                   ← zone fallback
body_act:generic:arousal_<band>
body_act:generic
```

## All Keys × Variables

```
body_act:<actionId>:orgasm:clitoral / vaginal / anal / combined / multiple / squirting / rare
body_act:<actionId>:arousal_low/mid/high/edge:subspace
body_act:<actionId>:arousal_low/mid/high/edge:engagement_resisting   ← Phase 54b
body_act:<actionId>:arousal_low/mid/high/edge:engagement_fainted     ← Phase 54b
body_act:<actionId>:arousal_low/mid/high/edge:once/repeat/extended
body_act:<actionId>:arousal_low/mid/high/edge
body_act:<bodyZone>:arousal_low/mid/high/edge
body_act:generic:arousal_low/mid/high/edge
body_act:generic
```

## Examples — Orgasm

### `body_act:thrust_slow:orgasm:clitoral`

- "Her whole core seizes. Thighs crush inward around him and the spasm runs up through her belly in three distinct waves. She stops breathing entirely for two full seconds."
- "The orgasm takes her legs first — they straighten and lock. Her inner walls clench in a long, rhythmic pull that she can't suppress."
- "Every muscle from her hips to her shoulders fires at once. Her back arches off the surface and holds there, shaking."

### `body_act:thrust_deep:orgasm:vaginal`

- "A deep internal clench, nothing like a surface response. Her whole posture collapses inward around it, hips grinding down hard."
- "She can't hold the position anymore. Her legs give and she folds, inner walls contracting in a slow, powerful sequence."

### `body_act:thrust_fast:orgasm:squirting`

- "Her body spasms and then floods. A gush that soaks the surface beneath her. She makes a sound like the last air leaving a room."
- "The release hits without warning. Her hips jerk forward and she floods — wet and uncontrolled, shaking from the waist down."

### `body_act:suck_clit:orgasm:multiple`

- "She's still in the first spasm when the second hits. Her whole body jerks like it's been struck, then goes limp for a beat before the third pulls her rigid again."

### `body_act:thrust_slow:orgasm:combined`

- "The orgasm builds from two points at once and meets in the middle. Her back arches, her legs lock, and she convulses in a wave that leaves her shaking."

## Examples — Subspace

### `body_act:thrust_slow:arousal_edge:subspace`

- "She's stopped pushing back. Her body just receives — loose, twitching with each stroke like a string plucked past its tension point."
- "There's no resistance, no effort. Each motion passes through her like she's water, small shudders the only proof anything registers."
- "Her muscles have unclenched completely. She doesn't respond with will; she responds with drift."

### `body_act:spank_ass:arousal_high:subspace`

- "Her body rocks forward with the impact but there's no flinch, no clench. She sways back slowly into position, waiting."

## Examples — Low Arousal × Repeat Axis

### `body_act:thrust_slow:arousal_low:once`

- "Her inner walls clench hard against the intrusion. A sharp inhale through her nose, breath held tight."
- "Her body closes reflexively — a rigid, involuntary lock. She braces from heel to shoulder."

### `body_act:thrust_slow:arousal_low:repeat`

- "The clenching comes a beat later now. Less reflex, more exhaustion. Her breathing has found a grim pattern."
- "The rigid response is still there, but it costs her something now. The held breath comes out slower."

### `body_act:thrust_slow:arousal_low:extended`

- "Her resistance has gone mechanical. A dry tighten and release with each stroke, body running on old instruction."
- "She's stopped actively fighting the motion. Her body still closes, still resists — but the urgency is gone from it."

## Examples — Mid Arousal × Repeat Axis

### `body_act:thrust_slow:arousal_mid:once`

- "The walls yield now, slick and accommodating. A pulse of inner muscle grips around the stroke without instruction."
- "She's wet enough that the motion runs clean. Her hips shift a half-degree, involuntary."

### `body_act:thrust_slow:arousal_mid:repeat`

- "Her body has found the rhythm and started to match it. A small, involuntary grind meets each push."
- "The physical response is ahead of her. Her hips have begun anticipating the stroke."

### `body_act:thrust_slow:arousal_mid:extended`

- "She's been responding for a while and her body has shifted gears — less of a reaction, more of a running accommodation."

## Examples — High Arousal × Repeat Axis

### `body_act:thrust_slow:arousal_high:once`

- "She's soaking. The penetration draws a full-body shudder on each inward push, her spine curling in slow response."
- "Her hips rise without instruction, pressing into the stroke."

### `body_act:thrust_slow:arousal_high:repeat`

- "Her inner walls grip greedily with each stroke. Her pelvis lifts to meet it before the motion even arrives."
- "She's past the point of restraint — her body rolls into it openly, thighs shaking."

### `body_act:thrust_slow:arousal_high:extended`

- "She's been grinding the entire time. Her thighs are trembling with sustained effort, body locked in a constant upward press."
- "Overstimulation is starting to bleed in. Each stroke hits harder than it should — she twitches even between movements."

## Examples — Edge Arousal × Repeat Axis

### `body_act:thrust_slow:arousal_edge:once`

- "The slightest pull draws a spasm. She's past processing — just reflex, every nerve at surface level."

### `body_act:thrust_slow:arousal_edge:repeat`

- "She's past coping. Each stroke unravels another degree of control. Her knees are no longer working properly."

### `body_act:thrust_slow:arousal_edge:extended`

- "She's been at the edge so long her body has started responding to nothing — twitching between strokes, inner walls fluttering on their own."
- "Overstimulation. Every touch is too much and not enough. She can't tell the difference between pleasure and overwhelm anymore."

## Examples — Other Actions

### `body_act:suck_clit:arousal_high:once`

- "Her hips lift sharply off the surface and freeze. Her thigh muscles stand out flat, locked in sustained contraction."

### `body_act:suck_clit:arousal_edge:repeat`

- "She can't hold still. Her pelvis is rocking into it whether she wills it or not, the motion small and desperate."

### `body_act:choke:arousal_mid:once`

- "Her hands fly to his wrist — a grip, not quite fighting, not quite bracing. Her throat works under the pressure."

### `body_act:choke:arousal_high:repeat`

- "Her hands are still on his wrist but the grip has softened. She's pressing into it slightly. Her eyes are half-closed."

### `body_act:spank_ass:arousal_low:once`

- "Her whole body lurches forward from the impact. She clamps her mouth shut."

### `body_act:spank_ass:arousal_high:repeat`

- "She rocks into it now, pushing back before the hand arrives. She's long since stopped pretending otherwise."

### `body_act:hair_pull:arousal_mid:once`

- "Her neck cranes back involuntarily with the pull. A bitten-off sound."

### `body_act:anal_thrust:arousal_low:once`

- "Her body closes hard against the intrusion — a full, involuntary clench that doesn't yield."

### `body_act:anal_thrust:arousal_mid:once`

- "The resistance is still there but the muscles yield slowly under sustained pressure. A low, strained sound."

## Examples — Zone Fallbacks

### `body_act:vagina:arousal_mid`

- "The inner walls flutter, slick and sensitive, responding with a slow involuntary grip."

### `body_act:clit:arousal_high`

- "Her hips jerk and then freeze. A rigid, locked response that breaks into trembling after a moment."

### `body_act:breast:arousal_low`

- "She stiffens at the contact, shoulders drawing in. Her breath goes shallow."

### `body_act:breast:arousal_high`

- "Her chest presses forward into the touch. Her nipples are drawn tight, sensitive to anything."

### `body_act:throat:arousal_mid`

- "Her throat works around the intrusion, involuntary swallowing. Her eyes water at the corners."

## Examples — Generic Fallbacks

### `body_act:generic:arousal_low`

- "Her body tightens at the contact, then settles into a held, shallow resistance."
- "A stiff inhale. Her muscles brace."

### `body_act:generic:arousal_high`

- "Her body is chasing it now — small, urgent adjustments that she's stopped trying to hide."

### `body_act:generic:arousal_edge`

- "She's past fighting it. Every nerve is at the surface, each motion landing like a current."

### `body_act:generic`

- "A small involuntary response — her body answers before her expression does."

# Layer 4 — SFX

**Authoring note:** Sound cues only. Short and precise. Auditory texture tied to action and wetness. **Onomatopoeia exclusively** — no verbs, no descriptive words. These are sound-design fragments, not prose. Use \`\~\` or \`...\` between sounds to represent rhythm and repetition — e.g. \`slch\~slch\~slch\`, \`\*glp\*\~\*slk\*\~\*glp\*\`. A string can contain multiple different onomatopoeia words if that reflects the actual sound pattern. What is never allowed: descriptions of sounds (\`"a wet sucking noise"\`, \`"rhythmic slapping"\`). Single-event sounds (a slap, a single cum pulse) need no repetition.

## Key Pattern

```
sfx:<actionId>:wetness_<level>
sfx:<actionId>
sfx:generic
```

## All Keys × Variables

```
sfx:<actionId>:wetness_dry
sfx:<actionId>:wetness_damp
sfx:<actionId>:wetness_moderate
sfx:<actionId>:wetness_wet
sfx:<actionId>:wetness_very_wet
sfx:<actionId>:wetness_dripping
sfx:<actionId>:wetness_flooding
sfx:<actionId>         ← wetness-agnostic fallback (impact/skin actions)
sfx:generic
```

## Examples — Penetrative × Wetness Progression

### `sfx:thrust_slow` × all wetness tiers

| Key | Examples |
| --- | --- |
| `sfx:thrust_slow:wetness_dry` | `fsh~fsh~fsh` · `hhk~hhk~hhk` |
| `sfx:thrust_slow:wetness_damp` | `slk~slk~slk` · `fft~fft~fft` |
| `sfx:thrust_slow:wetness_moderate` | `slck~slck~slck` · `fwp~fwp~fwp` |
| `sfx:thrust_slow:wetness_wet` | `slch~slch~slch` · `sqk~sqk~sqk` |
| `sfx:thrust_slow:wetness_very_wet` | `squelch~squelch~squelch` · `schlk~schlk~schlk` |
| `sfx:thrust_slow:wetness_dripping` | `schlck~schlck~schlck` · `schluck~schluck~schluck` |
| `sfx:thrust_slow:wetness_flooding` | `schlack~schlack~schlack` · `gwlk~gwlk~gwlk` |

### `sfx:thrust_fast` × key wetness tiers

| Key | Examples |
| --- | --- |
| `sfx:thrust_fast:wetness_moderate` | `fwp~fwp~fwp~fwp` · `slck~slck~slck` |
| `sfx:thrust_fast:wetness_wet` | `sqk~sqk~sqk~sqk` · `slch~slch~slch` |
| `sfx:thrust_fast:wetness_dripping` | `schlck~schlck~schlck~schlck` |
| `sfx:thrust_fast:wetness_flooding` | `schlack~schlack~schlack` · `gwlk~gwlk~gwlk` |

### `sfx:vaginal_pound:wetness_flooding`

- `gwlk~gwlk~gwlk~gwlk~gwlk`
- `schlack~schlack~schlack~schlack`

## Examples — Oral Actions

| Key | Examples |
| --- | --- |
| `sfx:lick_vagina:wetness_moderate` | `slp~slp~slp` · `mwp~mwp~mwp` |
| `sfx:lick_vagina:wetness_wet` | `schllp~schllp~schllp` |
| `sfx:suck_clit:wetness_moderate` | `slp~slp~slp` · `phlp~phlp~phlp` · `fhlp~fhlp~fhlp` |
| `sfx:suck_clit:wetness_wet` | `schlp~schlp~schlp` · `mwlp~mwlp~mwlp` |
| `sfx:blowjob_passive:wetness_wet` | `glp~glp~glp` · `slk~slk~slk` |
| `sfx:blowjob_passive:wetness_very_wet` | `glp~glp~glp~glp` |
| `sfx:deepthroat:wetness_very_wet` | `glk~glk~glk` · `gkh~gkh~gkh` |
| `sfx:throatfuck:wetness_very_wet` | `glkk~glkk~glkk` · `gkh~gkh~gkh` |
| `sfx:facefuck:wetness_flooding` | `gkh~gkh~gkh` · `glk~glk~glk` |
| `sfx:lick_anal:wetness_moderate` | `slp~slp~slp` · `fwp~fwp~fwp` |

## Examples — Fingering

| Key | Examples |
| --- | --- |
| `sfx:finger_vagina:wetness_moderate` | `fwp~fwp~fwp` · `slk~slk~slk` |
| `sfx:finger_vagina:wetness_wet` | `sqk~sqk~sqk` · `schlp~schlp~schlp` |
| `sfx:finger_vagina:wetness_dripping` | `schlck~schlck~schlck` |
| `sfx:rub_clit:wetness_damp` | `fsh~fsh~fsh` |
| `sfx:rub_clit:wetness_wet` | `slsch~slsch~slsch` |
| `sfx:gspot_finger:wetness_very_wet` | `fwlk~fwlk~fwlk` |

## Examples — Impact / Dominance

```
sfx:spank_ass     →  *smack*  ·  *crack*  ·  *thwap*
sfx:spank_breast  →  *slap*   ·  *smack*
sfx:face_slap     →  *crack*  ·  *slap*
sfx:hair_pull     →  *shk*    ·  *fwsh*
sfx:choke         →  *glk*~*glk*~*glk*  ·  *hk*~*hk*~*hk*  ·  kkh~kkh~kkh
```

## Examples — Breast / Nipple

```
sfx:suck_nipples:wetness_damp      →  slp~slp~slp
sfx:suck_nipples:wetness_wet       →  schllp~schllp~schllp
sfx:breast_milk:wetness_moderate   →  psh~psh~psh  ·  fsh~fsh~fsh
sfx:breast_milk:wetness_flooding   →  psh~psh~psh~psh  ·  squirt~squirt~squirt
```

## Examples — Cum

```
sfx:cum_inside     →  *hff*  ·  *hlf*
sfx:cum_on_face    →  *fwp*  ·  *psh*  ·  *splat*
sfx:cum_in_mouth   →  *glp*  ·  *ulk*
sfx:cum_on_breast  →  *psh*  ·  *fwp*
```

## Examples — Anal

```
sfx:anal_thrust:wetness_moderate   →  fwp~fwp~fwp
sfx:anal_thrust:wetness_wet        →  slch~slch~slch
sfx:anal_pound:wetness_wet         →  slch~slch~slch~slch
```

## Examples — Generic

```
sfx:generic   →  *hff*~*hff*~*hff*  ·  *shk*
```

# Layer 5 — VOCAL

**Authoring note:** What she actually says and the sounds from her mouth. Include onomatopoeia, broken words, half-sentences, hesitations. Orgasm: broken and partial words. High arousal: desperate, begging. Shame-high + low arousal (forced-context proxy): hateful denial, refusal, anger. Shame-high + high arousal: self-betrayal — she's saying no while her body says yes. Non-verbal sounds must be onomatopoeia written out (\*hah\*, \*hngh\*, \*mm\*, \*ah\*) — never descriptions of sounds (no "a broken moan", no "a sob", no "wordless sounds"). Silence or dissociation is written as "..." or a half-word that trails off, not narrated.

## Key Pattern (fallback chain order)

```
vocal:<actionId>:orgasm:<orgasmType>                                   (+ race prefix)
vocal:<actionId>:subspace                                              (+ race prefix)
vocal:<actionId>:engagement_<eng>:arousal_<band>:<repeatTier>          (+ race prefix) ← Phase 54a
vocal:<actionId>:engagement_<eng>:arousal_<band>                       (+ race prefix) ← Phase 54a
vocal:<actionId>:engagement_<eng>                                      (+ race prefix) ← Phase 54a
vocal:<actionId>:shame_<tier>:arousal_<band>:<repeatTier>              (+ race prefix)
vocal:<actionId>:arousal_<band>:<repeatTier>                           (+ race prefix)
vocal:<actionId>:arousal_<band>                                        (+ race prefix)
vocal:<actionId>                                                       (+ race prefix)
vocal:generic:shame_<tier>:arousal_<band>                              (+ race prefix)
vocal:generic                                                          (+ race prefix)
```

Race prefix: for monster-race partners, `vocal:race_<race>:<rest-of-key>` is tried before each base key.

## All Keys × Variables

```
// ORGASM
vocal:<actionId>:orgasm:clitoral / vaginal / anal / combined / multiple / squirting / rare

// SUBSPACE
vocal:<actionId>:subspace

// ENGAGEMENT (Phase 54a — fires for resisting / hesitant / fainted only)
vocal:<actionId>:engagement_<eng>:arousal_low/mid/high/edge:once/repeat/extended
vocal:<actionId>:engagement_<eng>:arousal_low/mid/high/edge
vocal:<actionId>:engagement_<eng>

// FULL SPECIFICITY (shame + band + repeat) — one grid per shame tier
vocal:<actionId>:shame_low:arousal_low/mid/high/edge:once/repeat/extended
vocal:<actionId>:shame_mid:arousal_low/mid/high/edge:once/repeat/extended
vocal:<actionId>:shame_high:arousal_low/mid/high/edge:once/repeat/extended

// BAND + REPEAT
vocal:<actionId>:arousal_low/mid/high/edge:once/repeat/extended

// BAND ONLY
vocal:<actionId>:arousal_low/mid/high/edge

// ACTION BASE
vocal:<actionId>

// GENERIC FALLBACKS
vocal:generic:shame_low/mid/high:arousal_low/mid/high/edge
vocal:generic

// RACE OVERLAY — same full grid, all prefixed vocal:race_<race>:
vocal:race_succubus:<any-base-key>
vocal:race_fox_girl:<any-base-key>
vocal:race_wolf_girl:<any-base-key>
// etc. for all 13 monster races
```

## Examples — Orgasm (broken, incoherent)

### `vocal:thrust_slow:orgasm:clitoral`

- `"—hnngh— *hah*— I— I— *hk*—"`
- `"please— yes— right— *there*— don't stop— don't—"`
- `"*hah*— *ah ah*— I'm— I'm—"`
- `"*hnn*— *hah*— *hah*—"`

### `vocal:thrust_deep:orgasm:vaginal`

- `"*hngh*— inside— it's— *hah*— I can't—"`
- `"too— it's too— *ah*— too much— don't—"`
- `"*hngh*— *hh*— *hh*—"`

### `vocal:thrust_fast:orgasm:squirting`

- `"*hah*—wh— what's— I'm— *oh*— I'm—"`
- `"*hah*— *oh*— *hah*— *hah*—"`
- `"no no no— *hah*— I can't— I'm—"`

### `vocal:suck_clit:orgasm:multiple`

- `"stop— *ah*— stop— I already— I can't— *hah*—"`
- `"too— it's too— I came— I already— *hngh*—"`

### `vocal:choke:orgasm:clitoral`

- `"*gkh*— *hah*— I— *gkh*—"`

## Examples — Subspace

### `vocal:thrust_slow:subspace`

- `"...mm... mm..."`
- `"...yhh..."`
- `"*nh*... *nh*..."`
- `"...mnh..."`

## Examples — Shame-high × Arousal-low (refusal, forced-context proxy)

### `vocal:thrust_slow:shame_high:arousal_low:once`

- `"Stop. Get off me— *stop*—"`
- `"Don't— I don't want this— don't—"`
- `"You have no right. No— *no*—"`
- `"Let go— let go of me—"`

### `vocal:thrust_slow:shame_high:arousal_low:repeat`

- `"Why won't you just—"`
- `"*ngh*—"`
- `"Ngh— don't look at me like that—"`

### `vocal:thrust_slow:shame_high:arousal_low:extended`

- `"...just get it over with..."`
- `"...I hate you..."`
- `"..."`

## Examples — Shame-high × Arousal-mid (conflicted, denying own response)

### `vocal:thrust_slow:shame_high:arousal_mid:once`

- `"I hate this— I hate— *ngh*—"`
- `"Don't— don't let me— *nngh*—"`
- `"Why is my body— stop it— stop—"`

### `vocal:thrust_slow:shame_high:arousal_mid:repeat`

- `"Don't say anything— don't— *ngh*—"`
- `"I'm not— this doesn't mean— *ah*—"`

### `vocal:thrust_slow:shame_high:arousal_mid:extended`

- `"Stop smiling— *ngh*— I'll—"`
- `"This doesn't— *ah*— this doesn't count—"`

## Examples — Shame-high × Arousal-high (self-betrayal — core bucket)

### `vocal:thrust_slow:shame_high:arousal_high:once`

- `"I don't— I swear I don't— *hah*— please just—"`
- `"Don't make me— *hngh*— don't—"`
- `"This isn't— I'm not— *please*—"`
- `"I hate that I— *ah*— I hate—"`

### `vocal:thrust_slow:shame_high:arousal_high:repeat`

- `"Don't tell anyone— *ngh*—"`
- `"I know what I sound like— just— *ah*— don't—"`
- `"I'm not asking for it— *hah*— I'm not—"`

### `vocal:thrust_slow:shame_high:arousal_high:extended`

- `"Why— why do I— *ah ah*— why—"`
- `"I give up caring— *hah*— just—"`

### `vocal:thrust_slow:shame_high:arousal_edge:once`

- `"I don't care anymore— *hah*— just— *please*—"`
- `"I give up— I give— *hah ah ah*—"`
- `"Hate me later— just don't— *stop*—"`

### `vocal:thrust_slow:shame_high:arousal_edge:repeat`

- `"*please*— I can't— don't stop— I hate—"`
- `"*ah*— *ah*— I don't want— *please*—"`

### `vocal:thrust_slow:shame_high:arousal_edge:extended`

- `"*hah*— *hh*— *hah*—"`
- `"*hah*— *hah*— don't look— *hah*—"`

## Examples — Shame-low × Arousal (open, willing)

### `vocal:thrust_slow:shame_low:arousal_mid:once`

- `"...mm..."`
- `"...that's..."`

### `vocal:thrust_slow:shame_low:arousal_high:once`

- `"Yes— right there— *ah*—"`
- `"Harder— *more*—"`
- `"Don't stop—"`

### `vocal:thrust_slow:shame_low:arousal_high:repeat`

- `"Again— there— *ah*— again—"`
- `"I love it— I— *hah*—"`

### `vocal:thrust_slow:shame_low:arousal_edge:extended`

- `"Don't stop don't stop don't— *ah ah ah*—"`
- `"I'm coming— I'm— *hah*—"`
- `"*please*— I'm so close—"`

## Examples — Band Only (simpler fallbacks)

### `vocal:thrust_slow:arousal_low`

- `"...ngh..."`
- Stiff exhale through the nose. No words.

### `vocal:thrust_slow:arousal_mid`

- `"...mhn..."`
- `"...ah..."`

### `vocal:thrust_slow:arousal_high`

- `"*ah*— *ah*—"`
- `"...more..."`

### `vocal:thrust_slow:arousal_edge`

- `"*ah ah ah*—"`
- `"please— *please*—"`

## Examples — Other Actions

### `vocal:choke:shame_high:arousal_low:once`

- `"*hk*— let— *gk*— let go—"`
- `"*glk*— stop— *kh*—"`

### `vocal:choke:shame_low:arousal_high:repeat`

- `"*hk*— yes— *glk*—"`
- `"*hhk*— more—"`

### `vocal:spank_ass:shame_high:arousal_low:once`

- `"*gasp*— don't you dare—"`
- `"*hff*— how dare—"`

### `vocal:spank_ass:shame_low:arousal_high:repeat`

- `"*ah*— again—"`
- `"*hff*— harder—"`

### `vocal:face_slap:shame_high:arousal_low:once`

- `"*gasp*— How dare you—"`
- `"You— *hff*—"`

### `vocal:lick_vagina:arousal_high:once`

- `"*ah*— there— right— don't move—"`

### `vocal:edging:arousal_edge:repeat`

- `"*please*— please let me— I can't—"`
- `"I'll do anything— just—"`

## Examples — Generic Fallbacks

### `vocal:generic:shame_high:arousal_low`

- `"Stop— please—"`
- Silence that costs something.

### `vocal:generic:shame_high:arousal_high`

- `"I hate that I— *hah*—"`
- `"Don't say anything— *ngh*—"`

### `vocal:generic:shame_low:arousal_high`

- `"Yes— yes—"`
- `"More—"`

### `vocal:generic`

- `"...hh..."`
- `"...mn..."`

## Examples — Monster Race Overlays

### `vocal:race_succubus:thrust_slow:arousal_high:once`

- `"*mm*— finally something interesting—"`
- `"You're doing better than most... *nn*—"`
- `"*tch*— don't stop now that you've started—"`

### `vocal:race_succubus:thrust_slow:orgasm:clitoral`

- `"*hah*— I— actually— *nn*—"` (rare for her to be undone)
- `"...you actually...— *hah*—"`

### `vocal:race_succubus:thrust_slow:subspace`

- `"...oh..."` (one syllable; she has stopped performing)

### `vocal:race_orc:thrust_slow:arousal_mid:once`

- `"*hrn*— weak— show teeth—"`
- `"Soft hands. *Hmm.*"`

### `vocal:race_orc:thrust_slow:arousal_high:once`

- `"*hgn*— better— that's— *ghn*—"`

### `vocal:race_fox_girl:thrust_slow:arousal_high:once`

- `"*ahn*— master— *hah*—"`
- `"Kyuu— *ah*—"`

### `vocal:race_fox_girl:thrust_slow:orgasm:clitoral`

- `"*kyuu*— *hah*— master— I—"`

### `vocal:race_wolf_girl:thrust_slow:arousal_edge:repeat`

- `"*hngh*— mark me— *hah*— please—"`
- `"*rhn*— yours— I'm— *ahn*—"`

### `vocal:race_demon:shame_high:arousal_low:once`

- `"Contemptible. *tch*— don't flatter yourself—"`
- `"*hff*— I've had worse. Barely."`

### `vocal:race_cow_girl:thrust_slow:arousal_high:once`

- `"*mnn*— full— I feel full— *hah*—"`

### `vocal:race_goblin:thrust_slow:arousal_high:repeat`

- `"*eeh*— more— more— *ahn*—"`

# Layer 6 — PLAYER\_LINE

**Authoring note:** Short assertive or dominant player lines. First person, present tense. Said during the action. Omitted entirely when `dirtyTalkTendency === NONE`. Arousal band drives tone — low is cold and commanding, edge is denial and control.

## Key Pattern

```
player:<actionId>:tec_fail
player:<actionId>:force          ← Phase 54d (FORCE_INTIMACY / FORCE_INTIMACY_SLEEPING)
player:<actionId>:arousal_<band>
player:<actionId>
player:generic
```

## All Keys × Variables

```
player:<actionId>:tec_fail
player:<actionId>:force           ← Phase 54d — coercive; fires on FORCE_INTIMACY / FORCE_INTIMACY_SLEEPING
player:<actionId>:arousal_low     ← controlled, commanding, no warmth
player:<actionId>:arousal_mid     ← measured dominance, may include assurance
player:<actionId>:arousal_high    ← possessive, observational, assertive
player:<actionId>:arousal_edge    ← denial, hold-it, look-at-me
player:<actionId>
player:generic
```

## Examples — Tec Fail

### `player:thrust_slow:tec_fail`

- `"Hold on. Let me adjust."`
- `"Stay still. Again."`
- `"Wrong angle. Don't move."`

## Examples — Arousal Low (cold, commanding)

### `player:thrust_slow:arousal_low`

- `"Don't fight it."`
- `"You'll take it."`
- `"Stay still."`
- `"Breathe."`
- `"I didn't say move."`

### `player:spank_ass:arousal_low`

- `"You don't get to protest that."`
- `"Hold position."`

### `player:choke:arousal_low`

- `"Eyes open."`
- `"Don't look away."`

### `player:hair_pull:arousal_low`

- `"Don't look away."`
- `"Head up."`

## Examples — Arousal Mid (measured, assuring or observational)

### `player:thrust_slow:arousal_mid`

- `"Good girl."`
- `"Feel that?"`
- `"That's it."`
- `"Keep breathing."`
- `"You're doing well."`

### `player:spank_ass:arousal_mid`

- `"Count them."`
- `"Say thank you."`

### `player:choke:arousal_mid`

- `"Look at me while I do this."`
- `"Breathe when I let you."`

### `player:lick_vagina:arousal_mid`

- `"Tell me what you want."`
- `"You're going to say it."`

## Examples — Arousal High (possessive, direct)

### `player:thrust_slow:arousal_high`

- `"Look at me."`
- `"Say it."`
- `"You're close. I feel you."`
- `"Don't hide that."`
- `"I want to hear you."`

### `player:spank_ass:arousal_high`

- `"Again?"`
- `"You're pushing back. Interesting."`

### `player:hair_pull:arousal_high`

- `"That's better."`
- `"I want to see your face."`

### `player:lick_vagina:arousal_high`

- `"Say my name."`
- `"Let me hear you."`

### `player:thrust_fast:arousal_high`

- `"That's mine."`
- `"All of it. Right now."`

## Examples — Arousal Edge (denial, edge-play commands)

### `player:thrust_slow:arousal_edge`

- `"Not yet."`
- `"Hold it."`
- `"Don't you dare finish without permission."`
- `"Eyes on me. Stay with me."`
- `"Wait for it."`

### `player:edging:arousal_edge`

- `"Not yet."`
- `"You'll wait."`
- `"Ask me."`
- `"Say it properly."`

### `player:cum_inside:arousal_edge`

- `"Take it."`
- `"All of it. Don't move."`
- `"Mine."`

## Examples — Generic

### `player:generic`

- `"Mine."`
- `"Stay with me."`
- `"Good."`
- `"There it is."`
- `"I've got you."`

---

# Authoring Priority Order

Start here to build maximum coverage with minimum effort.

1. **VOCAL `shame_high:arousal_high`** — the self-betrayal bucket. Most dramatically important. Author 8+ strings per major penetrative action (`thrust_slow`, `thrust_fast`, `thrust_deep`).
2. **VOCAL `shame_high:arousal_low`** — resistance / forced-context proxy until Phase 54a wires `engagement_resisting` into the VOCAL chain. Author 6+ per major action.
3. **BODY\_ACTION `arousal_low/mid/high` × all three repeat tiers** — the habituation and escalation curve. Author the full once/repeat/extended grid for `thrust_slow`, `thrust_fast`, `suck_clit`, `finger_vagina` first.
4. **BODY\_ACTION orgasm variants** — pick 2–3 orgasm types per action and author them. `clitoral` and `squirting` first.
5. **NARRATION `engagement_resisting`** — the only forced-context key that is wired today. Author 5+ per major action.
6. **SFX wetness progression** — the full 7-tier wetness table for `thrust_slow`, `thrust_fast`, `lick_vagina`, `blowjob_passive`.
7. **Monster race VOCAL overlays** — Succubus and Fox Girl carry the most story weight. Author their orgasm and `arousal_high` keys first.
8. **BODY\_POSITION arousal bands** — all four bands for `missionary`, `doggy`, `cowgirl`, `full_nelson`.
9. **PLAYER\_LINE** — all four arousal bands for `thrust_slow`, `spank_ass`, `choke`, `edging`.
10. **Generic fallbacks** — `body_act:generic`, `vocal:generic`, `narration:generic`, `sfx:generic` last. These catch all uncovered combinations and should each have 4–6 strings.
